CREATE INDEX map_notes_location_index ON public.map_notes USING gist (location);

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_updated_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
    UPDATE public.users
    SET first_name = new.raw_user_meta_data ->> 'firstName',
    last_name = new.raw_user_meta_data ->> 'lastName'
    WHERE auth_id = NEW.id;
  
    RETURN NEW;
  END;
$function$
;

create policy "update based on auth_id"
on "public"."users"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = auth_id));



