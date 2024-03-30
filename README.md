<h1 align="center">STREAM PANEL</h1>

Powered By [EasyPanel](https://easypanel.io/)

<br/>

## Features

This template includes the following:

- Next.js 14
- TypeScript
- ESLint
- Prettier
- Chakra UI
- Prisma
- Next-Auth
- Docker Compose with:
    - PostgresQL
    - Mailpit

## Getting Started

#### For Development

- We use `pnpm` package manager. Get it [here](https://pnpm.io/installation).
- Make sure Docker up and running.
- If your Docker account has 2FA enabled, you have to create a Personal Access Token and login before:
    - Follow [this guide](https://docs.docker.com/docker-hub/access-tokens/).
    - Login with `docker login --username <your-username>`

#### Clone the project

You can either use this template by:

- Click the **"Use this template"** button and follow the instruction
- Or using the script below:

```bash
npx tiged wish-oss/stream-panel your-project
```

Optional: Search and replace `stream-panel` with your project slug.

#### Install dependencies

```bash
cd your-project
pnpm install
```

## Setup environment variables

For the first time, you need some default environment variables:

```bash
cp .env.development.example .env
```

#### If you want to use magic link login

Uncomment the `SMPT` section in `.env` file. By default we already set Mailpit for you.

The mailbox can be reach at http://localhost:8025


#### If you want to use GitHub login

Uncomment the `GITHUB` section in .env file. Follow this [documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) to configure the authentication.

#### Let's get started!

Then, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and start developing.

## Further instructions

Currently we leave only EasyPanel helper actions along with its templates. This is heavy and repetitive task that's why we don't want to add all the templates from EasyPanel.

The main idea of this STREAM PANEL is, you can use it to quickly start developing a product/service and serve your customers right away.

It does not mean to replace the EasyPanel product.

To use EasyPanel function, you need to obtain and set up the .env file:

```bash
EASYPANEL_URL=https://your-easypanel.url
EASYPANEL_API_KEY=your-easypanel-apikey
```

NOTE: The actions by default will create new project for 1-1 match with our stream-panel Project. The free version of EasyPanel only supports 3 projects!
Make sure to upgrade your EasyPanel license.
