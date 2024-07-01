alter table "public"."comments" add column "text" text not null;

alter table "public"."comments" add column "user_id" uuid not null;

alter table "public"."comments" add constraint "public_comments_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) not valid;

alter table "public"."comments" validate constraint "public_comments_user_id_fkey";

create policy "Enable insert for users based on user_id"
on "public"."comments"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable read access for all users"
on "public"."comments"
as permissive
for select
to public
using (true);



