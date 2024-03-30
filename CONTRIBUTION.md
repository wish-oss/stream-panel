### Finding issues to work on

- `good first issue` - issues where there is a clear path to resolution
- `help wanted`- issues where we've identified a need but not resources to work on them
- `priority/important-soon` or `priority/important-longterm` - high impact issues that need to be addressed in the next couple of releases.

Once you've discovered an issue to work on:

- Add a comment mentioning that you plan to work on the issue
- Send a PR out that mentions the issue

### Local Setup for Development

#### Prerequisites

- We use `pnpm` package manager. Get it [here](https://pnpm.io/installation).
- Make sure Docker up and running.`

#### Let's begin

- Firstly fork the repository and clone the forked repo to your system

- Change the directory to the project and install the dependencies

```bash 
cd stream-panel
pnpm install
```

- We need to setup environment variables, so first copy env the file as below

```bash
cp .env.development.example .env
```

- Now make changes to .env file that you copied.

> Note: 
  For email authentication we can use either `magic link` or `Github/Google Oauth`

- #### If you want to use magic link login

Uncomment the `SMPT` section in `.env` file. By default we already set Mailpit for you.

The mailbox can be reach at http://localhost:8025


- #### If you want to use GitHub login

Uncomment the `GITHUB` section in .env file. Follow this [documentation](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/creating-an-oauth-app) to configure the authentication. 

You can follow the same approch for Google Oauth as well.

#### Let's get started!

For example, if you've setup the .env to use magic link then the .env would look something like this:
```
NEXTAUTH_SECRET=topsecret
NEXTAUTH_URL=http://localhost:3000
 
# --- Start for development
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_PORT=5432
# --- End for development
ENVIRONMENT=localhost
# PostgreSQL database URL 
DATABASE_URL="postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${ENVIRONMENT}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public"
# Use this one for Github/Google Oauth and syncing
# GITHUB_TOKEN=
# GITHUB_ID=
# GITHUB_SECRET=
# GITHUB_ORG=
# GOOGLE_CLIENT_ID=
# GOOGLE_CLIENT_SECRET=
# Use this one for magic link authentication
SMTP_USER=mailpit
SMTP_PASSWORD=topsecret
SMTP_HOST=0.0.0.0
SMTP_PORT=1025
EMAIL_FROM="StreamPanel Team <noreply@example.com>"
EASYPANEL_URL=
EASYPANEL_API_KEY=
```
Then, start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and start developing.


#### To use Easypanel function

If you want to deploy templates/projects in the stream-panel, you first need to setup easypanel and then get an API key.

To setup easypanel, checkout: https://easypanel.io/ 

Finally update the .env file with following varaibles configured

```bash
EASYPANEL_URL=https://your-easypanel.url
EASYPANEL_API_KEY=your-easypanel-apikey
```

### Contributing A Patch

1. Submit an issue describing your proposed change
2. A reviewer will respond to your issue promptly.
3. Submit a pull request.
