-- =====================================================================
-- MISSION MAISON — création de la base de données
-- À coller en une seule fois dans Supabase > SQL Editor > Run
-- =====================================================================

-- ---------- 1. PROFILS (Papa, Maman, Lili, Romy) ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  prenom text not null,
  role text not null check (role in ('parent','enfant')),
  notes_actives boolean not null default false,  -- Lili : oui ; Romy : à activer à l'entrée au collège
  bonus_note_18 boolean not null default false,  -- Romy : 5 € pour une note de 18 à 19,5
  code_actif boolean not null default false      -- Lili : sessions de code
);

-- Création automatique du profil quand on ajoute un utilisateur
-- (identifiant = début de l'e-mail : lili@..., romy@..., papa@..., maman@...)
create or replace function public.creer_profil()
returns trigger language plpgsql security definer set search_path = public as $$
declare v text := lower(split_part(new.email, '@', 1));
begin
  insert into public.profiles (id, prenom, role, notes_actives, bonus_note_18, code_actif)
  values (
    new.id,
    initcap(v),
    case when v in ('papa','maman') then 'parent' else 'enfant' end,
    v = 'lili',
    v = 'romy',
    v = 'lili'
  )
  on conflict (id) do nothing;
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.creer_profil();

create or replace function public.is_parent()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'parent');
$$;

-- ---------- 2. MISSIONS ----------
create table if not exists public.missions (
  id bigserial primary key,
  titre text not null,
  points int not null check (points > 0),
  periode text not null check (periode in ('repas','jour','semaine','quinzaine','mois','trimestre','evenement')),
  max_par_periode int not null default 1,
  limite_texte text not null,
  perso boolean not null default false,          -- mission « à soi » (sa chambre, ses draps) : chacune la sienne
  ferme_alerte_linge boolean not null default false,
  actif boolean not null default true,
  ordre int not null default 100,
  created_at timestamptz not null default now()
);

-- ---------- 3. RÉALISATIONS (réservation → photo → validation) ----------
create table if not exists public.realisations (
  id bigserial primary key,
  mission_id bigint not null references public.missions(id) on delete cascade,
  enfant_id uuid not null references public.profiles(id) on delete cascade,
  lock_key text not null,
  statut text not null default 'reservee' check (statut in ('reservee','envoyee','validee','annulee')),
  photo_path text,
  points int not null,
  commentaire text,
  created_at timestamptz not null default now(),
  envoye_at timestamptz,
  decide_at timestamptz,
  decide_par uuid references public.profiles(id)
);
-- une mission réservée ne peut être prise que par une seule personne à la fois
create unique index if not exists realisations_verrou
  on public.realisations (mission_id, lock_key) where statut in ('reservee','envoyee');

-- ---------- 4. MOUVEMENTS DE POINTS ----------
-- points_enfant : effet sur le compteur de la fille (jamais sous 0)
-- points_commun : effet sur les objectifs communs
create table if not exists public.mouvements (
  id bigserial primary key,
  enfant_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('mission','note','code','retrait','recompense','correction')),
  libelle text not null,
  points_enfant int not null,
  points_commun int not null,
  photo_path text,
  created_at timestamptz not null default now(),
  created_par uuid references public.profiles(id)
);

-- ---------- 5. NOTES ----------
create table if not exists public.notes (
  id bigserial primary key,
  enfant_id uuid not null references public.profiles(id) on delete cascade,
  matiere text not null,
  note numeric not null,
  sur numeric not null,
  note20 numeric not null,
  photo_path text,
  statut text not null default 'envoyee' check (statut in ('envoyee','validee','refusee')),
  points int not null,
  bonus numeric not null default 0,
  commentaire text,
  created_at timestamptz not null default now(),
  decide_at timestamptz
);

-- ---------- 6. CODE DE LA ROUTE ----------
create table if not exists public.code_sessions (
  id bigserial primary key,
  enfant_id uuid not null references public.profiles(id) on delete cascade,
  score int not null check (score between 0 and 40),
  adulte text not null,
  serie_close boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- 7. BONUS EN EUROS ----------
create table if not exists public.bonus (
  id bigserial primary key,
  enfant_id uuid not null references public.profiles(id) on delete cascade,
  montant numeric not null,
  motif text not null,
  statut text not null default 'disponible' check (statut in ('disponible','encaisse','epargne')),
  abondement numeric not null default 0,
  remis boolean not null default false,
  created_at timestamptz not null default now(),
  choisi_at timestamptz,
  remis_at timestamptz
);

-- ---------- 8. RÉCOMPENSES (tranches de 200 points) ----------
create table if not exists public.recompenses (
  id bigserial primary key,
  enfant_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('argent','sortie','epargne','moitie')),
  sortie text,
  poche numeric not null default 0,
  epargne numeric not null default 0,
  abondement numeric not null default 0,
  remise boolean not null default false,
  created_at timestamptz not null default now(),
  remise_at timestamptz
);

-- ---------- 9. SORTIES, IDÉES, ALERTE LINGE ----------
create table if not exists public.sorties (
  id bigserial primary key,
  nom text not null,
  actif boolean not null default true
);

create table if not exists public.idees (
  id bigserial primary key,
  enfant_id uuid not null references public.profiles(id) on delete cascade,
  type text not null check (type in ('mission','sortie')),
  texte text not null,
  statut text not null default 'en_attente' check (statut in ('en_attente','acceptee','refusee')),
  reponse text,
  created_at timestamptz not null default now()
);

create table if not exists public.alertes (
  id bigserial primary key,
  type text not null default 'linge',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  created_par uuid references public.profiles(id)
);

-- =====================================================================
-- SÉCURITÉ : tout le monde (connecté) peut lire ; les écritures passent
-- par les fonctions ci-dessous, qui vérifient les règles du contrat.
-- =====================================================================
do $$
declare t text;
begin
  foreach t in array array['profiles','missions','realisations','mouvements','notes','code_sessions','bonus','recompenses','sorties','idees','alertes']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "lecture famille" on public.%I', t);
    execute format('create policy "lecture famille" on public.%I for select to authenticated using (true)', t);
  end loop;
end $$;

drop policy if exists "parents gerent missions" on public.missions;
create policy "parents gerent missions" on public.missions for all to authenticated
  using (public.is_parent()) with check (public.is_parent());

drop policy if exists "parents gerent sorties" on public.sorties;
create policy "parents gerent sorties" on public.sorties for all to authenticated
  using (public.is_parent()) with check (public.is_parent());

drop policy if exists "parents gerent profils" on public.profiles;
create policy "parents gerent profils" on public.profiles for update to authenticated
  using (public.is_parent()) with check (public.is_parent());

-- ---------- Stockage des photos (privé) ----------
insert into storage.buckets (id, name, public) values ('photos', 'photos', false)
  on conflict (id) do nothing;

drop policy if exists "photos lecture" on storage.objects;
create policy "photos lecture" on storage.objects for select to authenticated using (bucket_id = 'photos');
drop policy if exists "photos envoi" on storage.objects;
create policy "photos envoi" on storage.objects for insert to authenticated with check (bucket_id = 'photos');
drop policy if exists "photos suppression" on storage.objects;
create policy "photos suppression" on storage.objects for delete to authenticated using (bucket_id = 'photos');

-- =====================================================================
-- FONCTIONS (les règles du contrat)
-- =====================================================================

create or replace function public.solde(p_enfant uuid)
returns int language sql stable security definer set search_path = public as $$
  select coalesce(sum(points_enfant), 0)::int from public.mouvements where enfant_id = p_enfant;
$$;

create or replace function public.debut_periode(p_periode text)
returns timestamptz language sql stable as $$
  select case p_periode
    when 'repas'     then date_trunc('day',     now() at time zone 'Europe/Paris') at time zone 'Europe/Paris'
    when 'jour'      then date_trunc('day',     now() at time zone 'Europe/Paris') at time zone 'Europe/Paris'
    when 'semaine'   then date_trunc('week',    now() at time zone 'Europe/Paris') at time zone 'Europe/Paris'
    when 'quinzaine' then now() - interval '14 days'
    when 'mois'      then date_trunc('month',   now() at time zone 'Europe/Paris') at time zone 'Europe/Paris'
    when 'trimestre' then date_trunc('quarter', now() at time zone 'Europe/Paris') at time zone 'Europe/Paris'
    else null end;
$$;

-- Article 2 & 3 : réserver une mission (verrou + limite)
create or replace function public.reserver_mission(p_mission bigint)
returns bigint language plpgsql security definer set search_path = public as $$
declare m public.missions; v_key text; v_nb int; v_max int; v_id bigint;
begin
  if public.is_parent() then raise exception 'Seules Lili et Romy réservent des missions.'; end if;
  select * into m from public.missions where id = p_mission and actif;
  if not found then raise exception 'Mission introuvable.'; end if;

  -- une réservation oubliée depuis plus de 12 h est libérée
  update public.realisations set statut = 'annulee'
   where statut = 'reservee' and created_at < now() - interval '12 hours';

  v_key := case when m.perso then auth.uid()::text else 'famille' end;
  v_max := case when m.periode = 'repas' then 2 * m.max_par_periode else m.max_par_periode end;

  if m.periode <> 'evenement' then
    select count(*) into v_nb from public.realisations
     where mission_id = m.id
       and (not m.perso or enfant_id = auth.uid())
       and statut in ('reservee','envoyee','validee')
       and created_at >= public.debut_periode(m.periode);
    if v_nb >= v_max then
      raise exception 'Limite atteinte pour cette mission (%).', m.limite_texte;
    end if;
  end if;

  begin
    insert into public.realisations (mission_id, enfant_id, lock_key, points)
    values (m.id, auth.uid(), v_key, m.points) returning id into v_id;
  exception when unique_violation then
    raise exception 'Cette mission vient d''être réservée par ta sœur.';
  end;
  return v_id;
end $$;

create or replace function public.annuler_reservation(p_id bigint)
returns void language plpgsql security definer set search_path = public as $$
begin
  update public.realisations set statut = 'annulee'
   where id = p_id and enfant_id = auth.uid() and statut = 'reservee';
end $$;

create or replace function public.envoyer_realisation(p_id bigint, p_photo text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_photo is null or p_photo = '' then raise exception 'Pas de photo, pas de points.'; end if;
  update public.realisations set statut = 'envoyee', photo_path = p_photo, envoye_at = now(), commentaire = null
   where id = p_id and enfant_id = auth.uid() and statut = 'reservee';
  if not found then raise exception 'Réservation introuvable.'; end if;
end $$;

-- Validation par un parent : OK = points ; pas OK = petit mot, à refaire
create or replace function public.decider_realisation(p_id bigint, p_ok boolean, p_commentaire text default null)
returns void language plpgsql security definer set search_path = public as $$
declare r public.realisations; m public.missions;
begin
  if not public.is_parent() then raise exception 'Réservé aux parents.'; end if;
  select * into r from public.realisations where id = p_id and statut = 'envoyee' for update;
  if not found then raise exception 'Déjà traitée.'; end if;
  select * into m from public.missions where id = r.mission_id;
  if p_ok then
    update public.realisations set statut = 'validee', decide_at = now(), decide_par = auth.uid(), commentaire = p_commentaire
     where id = p_id;
    insert into public.mouvements (enfant_id, type, libelle, points_enfant, points_commun, created_par)
    values (r.enfant_id, 'mission', m.titre, r.points, r.points, auth.uid());
    if m.ferme_alerte_linge then update public.alertes set active = false where type = 'linge' and active; end if;
  else
    update public.realisations set statut = 'reservee', photo_path = null, created_at = now(),
           commentaire = coalesce(nullif(p_commentaire,''), 'Pas tout à fait fini : à refaire.')
     where id = p_id;
  end if;
end $$;

-- Article 4 : bonnes notes
create or replace function public.bareme_note(p_note20 numeric, p_enfant uuid, out points int, out bonus numeric)
language plpgsql stable security definer set search_path = public as $$
declare b18 boolean;
begin
  select bonus_note_18 into b18 from public.profiles where id = p_enfant;
  if p_note20 >= 20 then points := 7; bonus := 5;
  elsif p_note20 >= 18 then points := 5; bonus := case when b18 then 5 else 0 end;
  elsif p_note20 >= 16 then points := 3; bonus := 0;
  else points := 0; bonus := 0; end if;
end $$;

create or replace function public.envoyer_note(p_matiere text, p_note numeric, p_sur numeric, p_photo text)
returns bigint language plpgsql security definer set search_path = public as $$
declare v20 numeric; b record; v_id bigint; actif boolean;
begin
  select notes_actives into actif from public.profiles where id = auth.uid();
  if not coalesce(actif,false) then raise exception 'Les notes ne sont pas encore activées pour toi.'; end if;
  if p_sur <= 0 or p_note < 0 or p_note > p_sur then raise exception 'Note invalide.'; end if;
  if p_photo is null or p_photo = '' then raise exception 'Ajoute la photo de ta copie ou de Pronote.'; end if;
  v20 := round(p_note * 20 / p_sur, 2);
  select * into b from public.bareme_note(v20, auth.uid());
  if b.points = 0 then raise exception 'Les points commencent à 16/20 (ta note : %/20).', rtrim(rtrim(v20::text, '0'), '.'); end if;
  insert into public.notes (enfant_id, matiere, note, sur, note20, photo_path, points, bonus)
  values (auth.uid(), p_matiere, p_note, p_sur, v20, p_photo, b.points, b.bonus) returning id into v_id;
  return v_id;
end $$;

create or replace function public.decider_note(p_id bigint, p_ok boolean, p_commentaire text default null)
returns void language plpgsql security definer set search_path = public as $$
declare n public.notes;
begin
  if not public.is_parent() then raise exception 'Réservé aux parents.'; end if;
  select * into n from public.notes where id = p_id and statut = 'envoyee' for update;
  if not found then raise exception 'Déjà traitée.'; end if;
  update public.notes set statut = case when p_ok then 'validee' else 'refusee' end,
         decide_at = now(), commentaire = p_commentaire where id = p_id;
  if p_ok then
    insert into public.mouvements (enfant_id, type, libelle, points_enfant, points_commun, created_par)
    values (n.enfant_id, 'note', n.matiere || ' : ' || rtrim(rtrim(n.note20::text, '0'), '.') || '/20', n.points, n.points, auth.uid());
    if n.bonus > 0 then
      insert into public.bonus (enfant_id, montant, motif)
      values (n.enfant_id, n.bonus, 'Note de ' || rtrim(rtrim(n.note20::text, '0'), '.') || '/20 en ' || n.matiere);
    end if;
  end if;
end $$;

-- Article 5 : code de la route
create or replace function public.terminer_session_code(p_score int, p_adulte text)
returns json language plpgsql security definer set search_path = public as $$
declare actif boolean; v_nb int; v_best int;
begin
  select code_actif into actif from public.profiles where id = auth.uid();
  if not coalesce(actif,false) then raise exception 'Le code n''est pas activé pour toi.'; end if;
  if coalesce(trim(p_adulte),'') = '' then raise exception 'Une session se fait avec un adulte dans la pièce.'; end if;
  insert into public.code_sessions (enfant_id, score, adulte) values (auth.uid(), p_score, p_adulte);
  select count(*), max(score) into v_nb, v_best from public.code_sessions
   where enfant_id = auth.uid() and not serie_close;
  if v_nb >= 3 then
    update public.code_sessions set serie_close = true where enfant_id = auth.uid() and not serie_close;
    insert into public.mouvements (enfant_id, type, libelle, points_enfant, points_commun, created_par)
    values (auth.uid(), 'code', 'Série de 3 sessions de code', 25, 25, auth.uid());
    if v_best >= 35 then
      insert into public.bonus (enfant_id, montant, motif)
      values (auth.uid(), 5, 'Code : ' || v_best || '/40 dans la série');
    end if;
    return json_build_object('serie_terminee', true, 'meilleur', v_best, 'bonus', v_best >= 35);
  end if;
  return json_build_object('serie_terminee', false, 'sessions', v_nb);
end $$;

-- Article 6 : retraits (le compteur s'arrête à 0, l'objectif commun perd tout)
create or replace function public.retirer_points(p_enfant uuid, p_motif text, p_montant int, p_photo text default null)
returns void language plpgsql security definer set search_path = public as $$
declare v_solde int;
begin
  if not public.is_parent() then raise exception 'Réservé aux parents.'; end if;
  if p_montant <= 0 then raise exception 'Montant invalide.'; end if;
  v_solde := public.solde(p_enfant);
  insert into public.mouvements (enfant_id, type, libelle, points_enfant, points_commun, photo_path, created_par)
  values (p_enfant, 'retrait', p_motif, -least(greatest(v_solde,0), p_montant), -p_montant, p_photo, auth.uid());
end $$;

-- Article 7 : récompense tous les 200 points
create or replace function public.demander_recompense(p_type text, p_sortie text default null)
returns bigint language plpgsql security definer set search_path = public as $$
declare v_id bigint;
begin
  if public.is_parent() then raise exception 'Réservé à Lili et Romy.'; end if;
  if public.solde(auth.uid()) < 200 then raise exception 'Il faut 200 points pour débloquer une récompense.'; end if;
  if p_type = 'sortie' and coalesce(p_sortie,'') = '' then raise exception 'Choisis ta sortie.'; end if;
  insert into public.recompenses (enfant_id, type, sortie, poche, epargne, abondement)
  values (auth.uid(), p_type, case when p_type = 'sortie' then p_sortie end,
          case p_type when 'argent' then 20 when 'moitie' then 10 else 0 end,
          case p_type when 'epargne' then 20 when 'moitie' then 10 else 0 end,
          case p_type when 'epargne' then 10 when 'moitie' then 5 else 0 end)
  returning id into v_id;
  insert into public.mouvements (enfant_id, type, libelle, points_enfant, points_commun, created_par)
  values (auth.uid(), 'recompense', 'Récompense : ' || case p_type when 'argent' then '20 €' when 'sortie' then 'sortie (' || p_sortie || ')'
          when 'epargne' then 'épargne complète' else 'moitié-moitié' end, -200, 0, auth.uid());
  return v_id;
end $$;

create or replace function public.remettre_recompense(p_id bigint)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_parent() then raise exception 'Réservé aux parents.'; end if;
  update public.recompenses set remise = true, remise_at = now() where id = p_id;
end $$;

-- Article 8 : bonus en euros
create or replace function public.choisir_bonus(p_id bigint, p_choix text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if p_choix not in ('encaisse','epargne') then raise exception 'Choix invalide.'; end if;
  update public.bonus set statut = p_choix, choisi_at = now(),
         abondement = case when p_choix = 'epargne' then montant * 0.5 else 0 end
   where id = p_id and enfant_id = auth.uid() and statut = 'disponible';
  if not found then raise exception 'Bonus introuvable.'; end if;
end $$;

create or replace function public.remettre_bonus(p_id bigint)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_parent() then raise exception 'Réservé aux parents.'; end if;
  update public.bonus set remis = true, remis_at = now() where id = p_id and statut <> 'disponible';
end $$;

-- Article 10 : idées
create or replace function public.proposer_idee(p_type text, p_texte text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if coalesce(trim(p_texte),'') = '' then raise exception 'Écris ton idée.'; end if;
  insert into public.idees (enfant_id, type, texte) values (auth.uid(), p_type, trim(p_texte));
end $$;

create or replace function public.repondre_idee(p_id bigint, p_ok boolean, p_reponse text default null,
  p_titre text default null, p_points int default null, p_periode text default 'semaine',
  p_max int default 1, p_limite_texte text default null, p_perso boolean default false)
returns void language plpgsql security definer set search_path = public as $$
declare i public.idees;
begin
  if not public.is_parent() then raise exception 'Réservé aux parents.'; end if;
  select * into i from public.idees where id = p_id and statut = 'en_attente' for update;
  if not found then raise exception 'Déjà traitée.'; end if;
  update public.idees set statut = case when p_ok then 'acceptee' else 'refusee' end, reponse = p_reponse where id = p_id;
  if p_ok and i.type = 'mission' then
    insert into public.missions (titre, points, periode, max_par_periode, limite_texte, perso)
    values (coalesce(nullif(p_titre,''), i.texte), coalesce(p_points, 2), p_periode, p_max,
            coalesce(nullif(p_limite_texte,''), '1 fois par semaine'), p_perso);
  elsif p_ok and i.type = 'sortie' then
    insert into public.sorties (nom) values (coalesce(nullif(p_titre,''), i.texte));
  end if;
end $$;

-- Linge
create or replace function public.signaler_linge()
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_parent() then raise exception 'Réservé aux parents.'; end if;
  insert into public.alertes (type, created_par) values ('linge', auth.uid());
end $$;

create or replace function public.fermer_linge()
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_parent() then raise exception 'Réservé aux parents.'; end if;
  update public.alertes set active = false where type = 'linge' and active;
end $$;

-- Les fonctions sont accessibles aux membres connectés uniquement
do $$
declare f text;
begin
  foreach f in array array['reserver_mission(bigint)','annuler_reservation(bigint)','envoyer_realisation(bigint,text)',
    'decider_realisation(bigint,boolean,text)','envoyer_note(text,numeric,numeric,text)','decider_note(bigint,boolean,text)',
    'terminer_session_code(int,text)','retirer_points(uuid,text,int,text)','demander_recompense(text,text)',
    'remettre_recompense(bigint)','choisir_bonus(bigint,text)','remettre_bonus(bigint)','proposer_idee(text,text)',
    'repondre_idee(bigint,boolean,text,text,int,text,int,text,boolean)','signaler_linge()','fermer_linge()','solde(uuid)']
  loop
    execute format('revoke all on function public.%s from public, anon', f);
    execute format('grant execute on function public.%s to authenticated', f);
  end loop;
end $$;

-- =====================================================================
-- DONNÉES DE DÉPART (contrat du 17/11/2026)
-- =====================================================================
insert into public.missions (titre, points, periode, max_par_periode, limite_texte, perso, ferme_alerte_linge, ordre)
select * from (values
  ('Sortir le sac poubelle quand il est plein, et le bac jaune avec (même s''il n''est pas plein)', 2, 'evenement', 1, 'quand le sac est plein', false, false, 1),
  ('Mettre la table', 2, 'repas', 1, '1 fois par repas', false, false, 2),
  ('Vider les petites poubelles (salle de bain, chambres)', 2, 'semaine', 1, '1 fois par semaine', false, false, 3),
  ('Débarrasser et nettoyer correctement la table', 3, 'repas', 1, '1 fois par repas', false, false, 4),
  ('Vider le lave-vaisselle', 3, 'evenement', 1, 'quand il a tourné', false, false, 5),
  ('Nettoyer le micro-ondes', 3, 'semaine', 1, '1 fois par semaine', false, false, 6),
  ('Ranger les courses', 3, 'evenement', 1, 'à chaque retour de courses', false, false, 7),
  ('Faire la vaisselle et l''essuyer', 4, 'repas', 1, '1 fois par repas', false, false, 8),
  ('Étendre le linge', 4, 'evenement', 1, '1 fois par machine', false, true, 9),
  ('Changer ses draps', 4, 'quinzaine', 1, '1 fois toutes les 2 semaines', true, false, 10),
  ('Plier le linge et le ranger dans les armoires', 5, 'evenement', 1, '1 fois par machine', false, false, 11),
  ('Laver les bacs à poubelles', 5, 'mois', 2, '2 fois par mois', false, false, 12),
  ('Poussières, aspirateur et toile dans sa chambre', 6, 'semaine', 1, '1 fois par semaine', true, false, 13),
  ('Nettoyer la salle de bain', 10, 'semaine', 1, '1 fois par semaine', false, false, 14),
  ('Aspirateur et toile dans tout l''étage', 10, 'semaine', 1, '1 fois par semaine', false, false, 15),
  ('Préparer à manger', 15, 'repas', 1, '1 fois par repas', false, false, 16),
  ('Grand tri de sa chambre', 20, 'trimestre', 1, '1 fois par trimestre', true, false, 17)
) as v(titre, points, periode, max_par_periode, limite_texte, perso, ferme_alerte_linge, ordre)
where not exists (select 1 from public.missions);

insert into public.sorties (nom)
select * from (values ('Cinéma avec pop-corn'), ('Bowling'), ('Laser game'), ('Patinoire ou piscine'),
  ('Crêperie ou goûter en ville'), ('Après-midi shopping')) as v(nom)
where not exists (select 1 from public.sorties);

-- Fin du script. Si tout s'est bien passé, Supabase affiche « Success. No rows returned ».
