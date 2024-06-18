This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Env variables
create a .env.local file

### Supabase setup
[Run supabase locally](https://supabase.com/docs/guides/cli/local-development?queryGroups=access-method&access-method=kong)
```
-- $ supabase start
-- if needed: $ supabase migraation args...
-- $ supabase db reset 
-- make a copy of .env.local.example in root directory
-- rename the copy .env.local
-- fill in .env.local with the values in terminal when you ran:  $ supabase start
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


If you are running into some issues, you might have to stop and start supabase again in docker
```




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
