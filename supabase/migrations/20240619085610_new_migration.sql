drop policy "'PUBLIC' map_notes read access for all users " on "public"."map_notes";

drop policy "Enable users to delete map_notes based on user_id" on "public"."map_notes";

drop policy "Users can view their own notes" on "public"."map_notes";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_all_user_notes(user_id uuid)
 RETURNS TABLE(lat double precision, long double precision, title text, body text, id integer, visibility text)
 LANGUAGE sql
AS $function$select 
  st_y(location :: geometry) as lat,
  st_x(location :: geometry) as long,
  title,
  body,
  id,
  visibility
from public.map_notes
where public.map_notes.user_id = auth.uid()$function$
;

create policy "Enable read access for all users"
on "public"."users"
as permissive
for select
to public
using (true);


create policy "'PUBLIC' map_notes read access for all users "
on "public"."map_notes"
as permissive
for select
to anon, authenticated
using ((visibility = 'PUBLIC'::visibility));


create policy "Enable users to delete map_notes based on user_id"
on "public"."map_notes"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Users can view their own notes"
on "public"."map_notes"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));



