-- =====================================================================
-- MISSION MAISON — ajout des onglets « Mon avenir » et « Mon argent »
-- À coller en une seule fois dans Supabase > SQL Editor > Run
-- (le script peut être relancé sans risque)
-- =====================================================================

-- ---------- 1. Réglages par fille ----------
alter table public.profiles add column if not exists lycee boolean not null default false;         -- « Mes spécialités »
alter table public.profiles add column if not exists argent_avance boolean not null default false; -- niveaux 3 et 4
update public.profiles set lycee = true, argent_avance = true where prenom = 'Lili' and not lycee and not argent_avance;

-- ---------- 2. Missions : catégorie, photo facultative, consigne ----------
alter table public.missions add column if not exists categorie text not null default 'maison';
alter table public.missions add column if not exists photo_requise boolean not null default true;
alter table public.missions add column if not exists description text;
do $$ begin
  alter table public.missions add constraint missions_categorie_check check (categorie in ('maison','avenir','argent'));
exception when duplicate_object then null; end $$;

alter table public.realisations add column if not exists texte text;

alter table public.mouvements drop constraint if exists mouvements_type_check;
alter table public.mouvements add constraint mouvements_type_check
  check (type in ('mission','note','code','retrait','recompense','correction','avenir','argent'));

-- ---------- 3. Validation des contenus par les parents ----------
-- ref = 'metier:<id>' ou 'lecon:<id>' ; version = numéro de version du texte
create table if not exists public.contenus_valides (
  ref text primary key,
  version int not null,
  statut text not null check (statut in ('valide','a_corriger')),
  commentaire text,
  decide_par uuid references public.profiles(id),
  decide_at timestamptz not null default now()
);

-- ---------- 4. Avis sur les métiers (J'adore / Bof / Pas pour moi) ----------
create table if not exists public.avis_metiers (
  enfant_id uuid not null references public.profiles(id) on delete cascade,
  metier text not null,
  avis text not null check (avis in ('adore','bof','non')),
  updated_at timestamptz not null default now(),
  primary key (enfant_id, metier)
);

-- ---------- 5. Quiz réussis (fiches, leçons, profil, niveaux) ----------
create table if not exists public.apprentissages (
  id bigserial primary key,
  enfant_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('fiche','lecon','profil','niveau')),
  ref text not null,
  score int not null default 0,
  total int not null default 0,
  reussi boolean not null default false,
  points int not null default 0,
  details jsonb,
  created_at timestamptz not null default now(),
  unique (enfant_id, ref)
);

-- ---------- 6. Objectif d'achat ----------
create table if not exists public.objectifs_achat (
  enfant_id uuid primary key references public.profiles(id) on delete cascade,
  libelle text not null,
  montant numeric not null check (montant > 0),
  epargne numeric not null default 0 check (epargne >= 0),
  updated_at timestamptz not null default now()
);

do $$
declare t text;
begin
  foreach t in array array['contenus_valides','avis_metiers','apprentissages','objectifs_achat']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "lecture famille" on public.%I', t);
    execute format('create policy "lecture famille" on public.%I for select to authenticated using (true)', t);
  end loop;
end $$;

-- =====================================================================
-- FONCTIONS
-- =====================================================================

-- Envoi d'une mission : photo obligatoire, sauf missions « à raconter » (texte obligatoire)
drop function if exists public.envoyer_realisation(bigint, text);
create or replace function public.envoyer_realisation(p_id bigint, p_photo text default null, p_texte text default null)
returns void language plpgsql security definer set search_path = public as $$
declare r public.realisations; m public.missions;
begin
  select * into r from public.realisations where id = p_id and enfant_id = auth.uid() and statut = 'reservee';
  if not found then raise exception 'Réservation introuvable.'; end if;
  select * into m from public.missions where id = r.mission_id;
  if m.photo_requise and coalesce(p_photo,'') = '' then raise exception 'Pas de photo, pas de points.'; end if;
  if not m.photo_requise and coalesce(trim(p_texte),'') = '' and coalesce(p_photo,'') = '' then
    raise exception 'Écris ce que tu as fait pour que Papa ou Maman puisse valider.';
  end if;
  update public.realisations set statut = 'envoyee', photo_path = nullif(p_photo,''), texte = nullif(trim(p_texte),''),
         envoye_at = now(), commentaire = null
   where id = p_id;
end $$;

-- Parents : valider ou demander une correction d'un contenu
create or replace function public.decider_contenu(p_ref text, p_version int, p_ok boolean, p_commentaire text default null)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_parent() then raise exception 'Réservé aux parents.'; end if;
  if not p_ok and coalesce(trim(p_commentaire),'') = '' then raise exception 'Écris ce qu''il faut corriger.'; end if;
  insert into public.contenus_valides (ref, version, statut, commentaire, decide_par, decide_at)
  values (p_ref, p_version, case when p_ok then 'valide' else 'a_corriger' end, nullif(trim(p_commentaire),''), auth.uid(), now())
  on conflict (ref) do update set version = excluded.version, statut = excluded.statut, commentaire = excluded.commentaire,
     decide_par = excluded.decide_par, decide_at = excluded.decide_at;
end $$;

-- Parents : valider d'un coup une liste de contenus [{ "ref": "...", "v": 1 }, ...]
create or replace function public.valider_contenus(p_items jsonb)
returns int language plpgsql security definer set search_path = public as $$
declare it jsonb; n int := 0;
begin
  if not public.is_parent() then raise exception 'Réservé aux parents.'; end if;
  for it in select * from jsonb_array_elements(p_items) loop
    insert into public.contenus_valides (ref, version, statut, commentaire, decide_par, decide_at)
    values (it->>'ref', (it->>'v')::int, 'valide', null, auth.uid(), now())
    on conflict (ref) do update set version = excluded.version, statut = 'valide', commentaire = null,
       decide_par = excluded.decide_par, decide_at = excluded.decide_at;
    n := n + 1;
  end loop;
  return n;
end $$;

-- Filles : donner son avis sur un métier
create or replace function public.donner_avis(p_metier text, p_avis text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if public.is_parent() then raise exception 'Réservé à Lili et Romy.'; end if;
  if p_avis is null then
    delete from public.avis_metiers where enfant_id = auth.uid() and metier = p_metier;
    return;
  end if;
  insert into public.avis_metiers (enfant_id, metier, avis) values (auth.uid(), p_metier, p_avis)
  on conflict (enfant_id, metier) do update set avis = excluded.avis, updated_at = now();
end $$;

-- Filles : enregistrer un quiz. Points seulement à la première réussite,
-- et 10 points maximum par semaine pour tout ce qui se fait dans l'appli.
create or replace function public.valider_quiz(p_type text, p_ref text, p_score int, p_total int,
  p_libelle text default null, p_details jsonb default null)
returns json language plpgsql security definer set search_path = public as $$
declare a public.apprentissages; v_base int; v_reussi boolean; v_semaine int; v_pts int := 0;
        v_niveau text; v_nb int; v_plafond boolean := false;
begin
  if public.is_parent() then raise exception 'Réservé à Lili et Romy.'; end if;
  if p_total <= 0 or p_score < 0 or p_score > p_total then raise exception 'Score invalide.'; end if;

  v_base := case p_type when 'fiche' then 1 when 'lecon' then 2 when 'profil' then 5 when 'niveau' then 5 else null end;
  if v_base is null then raise exception 'Type inconnu.'; end if;

  if p_type = 'fiche' then v_reussi := p_total >= 4 and p_score >= p_total - 1;
  elsif p_type = 'lecon' then v_reussi := p_total >= 5 and p_score >= p_total - 1;
  elsif p_type = 'profil' then
    v_reussi := p_total >= 15 and p_ref = 'profil:' || extract(year from now() at time zone 'Europe/Paris')::int;
  else
    -- un niveau est terminé quand ses 5 leçons sont réussies (ref 'niveau:n1' ↔ leçons 'lecon:n1-…')
    v_niveau := split_part(p_ref, ':', 2);
    select count(*) into v_nb from public.apprentissages
     where enfant_id = auth.uid() and type = 'lecon' and reussi and ref like 'lecon:' || v_niveau || '-%';
    v_reussi := v_nb >= 5;
    if not v_reussi then raise exception 'Termine d''abord les 5 leçons de ce niveau.'; end if;
  end if;

  select * into a from public.apprentissages where enfant_id = auth.uid() and ref = p_ref for update;
  if found then
    -- déjà tenté : on peut réussir plus tard, mais sans nouveaux points
    if v_reussi and not a.reussi then
      update public.apprentissages set reussi = true, score = p_score, total = p_total,
             details = coalesce(p_details, details) where id = a.id;
    end if;
    return json_build_object('points', 0, 'reussi', v_reussi or a.reussi, 'deja', true);
  end if;

  if v_reussi then
    select coalesce(sum(points), 0) into v_semaine from public.apprentissages
     where enfant_id = auth.uid() and created_at >= public.debut_periode('semaine');
    v_pts := greatest(0, least(v_base, 10 - v_semaine));
    if v_pts = 0 then
      -- plafond atteint : on n'enregistre rien, elle pourra gagner ces points la semaine prochaine
      return json_build_object('points', 0, 'reussi', true, 'plafond', true);
    end if;
    v_plafond := v_pts < v_base;
  end if;

  insert into public.apprentissages (enfant_id, type, ref, score, total, reussi, points, details)
  values (auth.uid(), p_type, p_ref, p_score, p_total, v_reussi, v_pts, p_details);

  if v_pts > 0 then
    insert into public.mouvements (enfant_id, type, libelle, points_enfant, points_commun, created_par)
    values (auth.uid(), case when p_type in ('lecon','niveau') then 'argent' else 'avenir' end,
            left(coalesce(nullif(p_libelle,''), p_ref), 120), v_pts, v_pts, auth.uid());
  end if;
  return json_build_object('points', v_pts, 'reussi', v_reussi, 'plafond', v_plafond);
end $$;

-- Filles : objectif d'achat (libellé vide = supprimer)
create or replace function public.definir_objectif(p_libelle text, p_montant numeric, p_epargne numeric default 0)
returns void language plpgsql security definer set search_path = public as $$
begin
  if public.is_parent() then raise exception 'Réservé à Lili et Romy.'; end if;
  if coalesce(trim(p_libelle),'') = '' then
    delete from public.objectifs_achat where enfant_id = auth.uid();
    return;
  end if;
  if p_montant is null or p_montant <= 0 then raise exception 'Indique le prix de ton objectif.'; end if;
  insert into public.objectifs_achat (enfant_id, libelle, montant, epargne)
  values (auth.uid(), trim(p_libelle), p_montant, greatest(0, coalesce(p_epargne, 0)))
  on conflict (enfant_id) do update set libelle = excluded.libelle, montant = excluded.montant,
     epargne = excluded.epargne, updated_at = now();
end $$;

do $$
declare f text;
begin
  foreach f in array array['envoyer_realisation(bigint,text,text)','decider_contenu(text,int,boolean,text)',
    'valider_contenus(jsonb)','donner_avis(text,text)','valider_quiz(text,text,int,int,text,jsonb)',
    'definir_objectif(text,numeric,numeric)']
  loop
    execute format('revoke all on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;

-- =====================================================================
-- MISSIONS « DANS LA VRAIE VIE » (validées par un parent)
-- =====================================================================
insert into public.missions (titre, points, periode, max_par_periode, limite_texte, perso, categorie, photo_requise, description, ordre)
select * from (values
  ('Raconte-moi un métier', 3, 'semaine', 1, '1 fois par semaine', true, 'avenir', false,
   'Choisis un métier de ton album et explique-le à table : ce qu''on y fait, les études, ce qui te plaît ou pas. Écris ensuite le nom du métier ici.', 101),
  ('Enquête métier', 8, 'mois', 2, '2 fois par mois', true, 'avenir', false,
   'Interroge un adulte sur son travail (5 questions proposées dans l''appli) et note ses réponses.', 102),
  ('Sortie orientation : portes ouvertes, salon ou journée découverte', 15, 'evenement', 1, 'à chaque sortie', true, 'avenir', true,
   'Va visiter un lycée, une école, un salon de l''orientation ou passe une journée dans une entreprise. Prends une photo sur place.', 103),
  ('Réunion investisseur avec Papa ou Maman', 10, 'trimestre', 1, '1 fois par trimestre', true, 'argent', false,
   'Regardez ensemble ton compte d''épargne : combien tu as versé, combien il vaut, ce qui a monté ou baissé et pourquoi. Écris ce que tu as retenu.', 111),
  ('Défi argent du mois', 5, 'mois', 1, '1 fois par mois', true, 'argent', false,
   'Relève le défi du mois affiché dans « Mon argent », puis explique ici ce que tu as fait.', 112)
) as v(titre, points, periode, max_par_periode, limite_texte, perso, categorie, photo_requise, description, ordre)
where not exists (select 1 from public.missions where categorie <> 'maison');

-- Fin du script. Si tout s'est bien passé, Supabase affiche « Success. No rows returned ».
