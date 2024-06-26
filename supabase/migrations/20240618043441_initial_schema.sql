create extension if not exists "postgis" with schema "extensions";


create type "public"."visibility" as enum ('PRIVATE', 'PUBLIC');

create table "public"."map_notes" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "title" text not null,
    "body" text,
    "location" geography(Point,4326) not null,
    "created_at" timestamp with time zone default now(),
    "updated_at" timestamp with time zone,
    "visibility" visibility not null default 'PUBLIC'::visibility
);


alter table "public"."map_notes" enable row level security;

create table "public"."users" (
    -- "id" uuid not null default gen_random_uuid(),
    "id" uuid not null references auth.users on delete cascade,
    "created_at" timestamp with time zone not null default now(),
    "auth_id" uuid not null default auth.uid(),
    "first_name" text not null default ''::text,
    "last_name" text not null default ''::text
);


alter table "public"."users" enable row level security;

CREATE UNIQUE INDEX map_notes_pkey ON public.map_notes USING btree (id);

CREATE UNIQUE INDEX users_auth_id_key ON public.users USING btree (auth_id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

alter table "public"."map_notes" add constraint "map_notes_pkey" PRIMARY KEY using index "map_notes_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."map_notes" add constraint "map_notes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."map_notes" validate constraint "map_notes_user_id_fkey";

alter table "public"."users" add constraint "public_users_auth_id_fkey" FOREIGN KEY (auth_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "public_users_auth_id_fkey";

alter table "public"."users" add constraint "users_auth_id_key" UNIQUE using index "users_auth_id_key";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_all_user_note(user_id uuid)
 RETURNS TABLE(lat double precision, long double precision, title text, body text, id uuid)
 LANGUAGE sql
AS $function$select 
  st_y(location :: geometry) as lat,
  st_x(location :: geometry) as long,
  title,
  body,
  id
from public.map_notes
where public.map_notes.user_id = user_id$function$
;

CREATE OR REPLACE FUNCTION public.get_all_user_notes(user_id uuid)
 RETURNS TABLE(lat double precision, long double precision, title text, body text, id uuid, visibility text)
 LANGUAGE sql
AS $function$
select 
  st_y(location :: geometry) as lat,
  st_x(location :: geometry) as long,
  title,
  body,
  id,
  visibility
from public.map_notes
where public.map_notes.user_id = user_id
$function$
;

CREATE OR REPLACE FUNCTION public.get_public_notes_in_bounds(min_lat double precision, min_long double precision, max_lat double precision, max_long double precision)
 RETURNS TABLE(id uuid, title text, body text, lat double precision, long double precision, firstname text)
 LANGUAGE sql
AS $function$
  
  select mn.id, mn.title, mn.body,
  st_y(mn.location :: geometry) as lat, st_x(mn.location :: geometry) as long,
  (select first_name from public.users u where u.auth_id = mn.user_id) as firstName
from
  public.map_notes mn
where
   visibility = 'PUBLIC'
 and
  location && ST_SetSRID(
  ST_MakeBox2D(
  ST_Point (min_long, min_lat),
  ST_Point (max_long, max_lat)
  ),
  4326
  ) 
   $function$
;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$begin
  insert into public.users (id, auth_id, first_name, last_name)
  values (new.id, new.id, new.raw_user_meta_data ->> 'firstName', new.raw_user_meta_data ->> 'lastName');
  return new;
end;$function$
;

grant delete on table "public"."map_notes" to "anon";

grant insert on table "public"."map_notes" to "anon";

grant references on table "public"."map_notes" to "anon";

grant select on table "public"."map_notes" to "anon";

grant trigger on table "public"."map_notes" to "anon";

grant truncate on table "public"."map_notes" to "anon";

grant update on table "public"."map_notes" to "anon";

grant delete on table "public"."map_notes" to "authenticated";

grant insert on table "public"."map_notes" to "authenticated";

grant references on table "public"."map_notes" to "authenticated";

grant select on table "public"."map_notes" to "authenticated";

grant trigger on table "public"."map_notes" to "authenticated";

grant truncate on table "public"."map_notes" to "authenticated";

grant update on table "public"."map_notes" to "authenticated";

grant delete on table "public"."map_notes" to "service_role";

grant insert on table "public"."map_notes" to "service_role";

grant references on table "public"."map_notes" to "service_role";

grant select on table "public"."map_notes" to "service_role";

grant trigger on table "public"."map_notes" to "service_role";

grant truncate on table "public"."map_notes" to "service_role";

grant update on table "public"."map_notes" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "'PUBLIC' map_notes read access for all users "
on "public"."map_notes"
as permissive
for select
to anon
using ((visibility = 'PUBLIC'::visibility));


create policy "Enable insert for users based on user_id"
on "public"."map_notes"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable update for users map_notes based on user_id"
on "public"."map_notes"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable users to delete map_notes based on user_id"
on "public"."map_notes"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Users can view their own notes"
on "public"."map_notes"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));



