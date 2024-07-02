drop policy "Enable insert for users based on user_id" on "public"."comments";

alter table "public"."comments" alter column "user_id" set default auth.uid();

create policy "Enable insert for users based on user_id"
on "public"."comments"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));



