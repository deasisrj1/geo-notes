This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### How to start?
-- try making your own todo list app using supabase and nextjs
-- try to do supabase auth, database, and storage
-- if you can successfully do that, you'll be able to know what's going on in this project

## TODO
-- add the db trigger on npm run dev

### Env variables
create a .env.local file
rename .env.sentry-build-plugin.example  without the .example and fill out the key

### Supabase setup
[Run supabase locally](https://supabase.com/docs/guides/cli/local-development?queryGroups=access-method&access-method=kong)

this trigger is not included in migrations, you need to do it yourself manually
[Auth trigger](https://supabase.com/docs/guides/auth/managing-user-data?queryGroups=language&language=js)
make sure you go to your database table and go to schema auth that the trigger is there
also go check the sql function you created is also there
If you register a new account and your public.users table gets populated that means its working, if not
something didnt work

```
-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, first_name, last_name)
  values (new.id, new.raw_user_meta_data ->> 'first_name', new.raw_user_meta_data ->> 'last_name');
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

```
-- $ supabase start
-- if needed: $ supabase migration args...
-- [$ supabase db reset ](https://supabase.com/docs/guides/cli/local-development?queryGroups=access-method&access-method=kong)
-- run supabase db reset so that you can run the migration to create tables for local db. all your registered users in local will be deleted if you run this
-- make a copy of .env.local.example in root directory
-- rename the copy .env.local
-- fill in .env.local with the values in terminal when you ran:  $ supabase start
-- run $ supabase db reset

-- go to your supabase folder and find config.toml
-- replace the value: enable_confirmations = false
-- under [auth.email] 
-- if you want to disable email verification, ie: signup without confirming in local dev, change this in production
-- or instead you can add this in signup logic:
 const data = {
    email: formData.get("email"),
    password: formData.get("password"),
    options: {
      data: {
        confirmation_sent_at: Date.now(),
        firstName: formData.get("firstname"),
        lastName: formData.get("lastname"),
      },
    },
  };

  const { error } = await supabase.auth.signUp(data);


[RLS security check](https://supabase.com/docs/guides/database/postgres/row-level-security)


If you are running into some issues, you might have to stop and start supabase again in docker
```

## Sentry
-- [setup](https://docs.sentry.io/platforms/javascript/guides/nextjs/)
-- todo: configure CI 


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## DB migrations
To save changes in local db ui into schema run the following
-- supabase db diff --use-migra -f name_your_schema_like_test_to_see_update_V1        
-- this might not include all db changes like triggers, functions, etc so double check



## Tracking, logs, error monitoring, feedback and observability

Vercel - Backend only
Sentry - Frontend only

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
