<div align="center">
      <h1>fasting-24</h1>
 </div>

<img src="https://github.com/turhansel/fasting-24/blob/main/fasting24-2.png?raw=true" alt='fasting-ss' width='100%'/>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#demo"><strong>Demo</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback and issues</strong></a>
</p>
<br/>

## Features

    -   Works across the entire [Next.js](https://nextjs.org) stack
    -   App Router
    -   Middleware
    -   Client
    -   Server
    -   Supabase
    -   Redux, Redux Toolkit, Redux Toolkit Query
    -   Styling with [Tailwind CSS](https://tailwindcss.com)
    -   UI components [shadcn/ui](https://ui.shadcn.com/)
    -   It just works!
    -   supabase-ssr. A package to configure Supabase Auth to use cookies

## Demo

You can view a fully working demo at [DEMO](https://fasting-24.vercel.app/).

## Clone and run locally

1.  You'll first need a Supabase project which can be made [via the Supabase dashboard](https://database.new)

2.  Clone project

```bash
git clone https://github.com/turhansel/fasting-24
```

3. Copy the `.env.local.example` file in this directory to `.env.local` (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

4. Then set each variable on `.env.local`:

```
   NEXT_PUBLIC_SUPABASE_URL=[INSERT SUPABASE PROJECT URL]
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[INSERT SUPABASE PROJECT API ANON KEY]
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

Both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` can be found in [your Supabase project's API settings](https://app.supabase.com/project/_/settings/api)

5.  You can now run the Next.js local development server:

        ```

    bun install
    bun dev

# or

npm install
npm run dev

# or

pnpm install
pnpm dev

# or

yarn install
yarn dev
```


-   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

> Check out [the docs for Local Development](https://supabase.com/docs/guides/getting-started/local-development) to also run Supabase locally.

## Feedback and issues

Please file feedback and issues over on the [fasting-24](https://github.com/turhansel/fasting-24/issues/new).
