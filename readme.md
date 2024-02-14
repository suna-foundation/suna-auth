# Suna Auth

Suna Auth is a package to simplify the process of user authentication with various platforms like Discord, Google, SMTP.

This package provides robust and customizable tools to manage user authentication. It allows you to focus on building your application while handling complex authentication logic.

## Installation

```shell
npm install suna-auth
```
Plugins can be found here: https://github.com/hot-hot-Solutions/suna-auth-plugins

## Usage

### Initialization

The sample library initialization example is below:

> #### Path: /api/auth/[...folder]/route.tsx

```typescript jsx
import { Auth } from "suna-auth";
import { MongooseAuth } from "suna-auth-mongoose";
import { RedisClient } from "suna-auth-redis";
import { DiscordProvider } from "suna-auth-discord";
import { SmtpProvider } from "suna-auth-smtp";

const initialize = new Auth(
  {
    discord: {
      cache: RedisClient.getInstance({ redis_url: env.REDIS_URL! }),
      provider: DiscordProvider.getInstance({
        client_id: env.DISCORD_CLIENT_ID!,
        client_secret: env.DISCORD_CLIENT_SECRET!,
        scopes: ["identify", "email", "guilds", "guilds.join"],
        authorization: "https://discord.com/api/oauth2/authorize",
      }),
      database: MongooseAuth.getInstance({ mongodb_url: env.MONGODB_URL! }),
    },
    smtp: {
      database: MongooseAuth.getInstance({ mongodb_url: env.MONGODB_URL! }),
      provider: SmtpProvider.getInstance({
        tokenLifetime: 60 * 60 * 1000, // The max is 1 week
        host: env.SMTP_HOST!,
        from: env.SMTP_FROM!,
        port: Number(env.SMTP_PORT!),
        password: env.SMTP_PASSWORD!,
        username: env.SMTP_USERNAME!,
        secure: env.SMTP_SECURE === "true",
      }),
      cache: RedisClient.getInstance({ redis_url: env.REDIS_URL! }),
    },
  },
  env.NEXTAUTH_SECRET,
);

export const GET = Auth.routes.GET;
```

### Verification

```typescript jsx
import { auth } from "suna-auth";
export default async function Example() {
  const session = await auth();

  return <div>
    {
      session ? <p>
        {session.user.name}
      </p> : <p>
        not logged in
      </p>
    }
  </div>
}
```

### Sign In

```typescript jsx
import { signIn } from "suna-auth/client";
<Button onClick={() => signIn("discord")}>Sign In With Discord</Button>
```


## Contributing
Plugins: https://github.com/hot-hot-Solutions/suna-auth-plugins

Auth: https://github.com/hot-hot-Solutions/suna-auth
