This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Prisma Migrate
Check out this reference [Prisma Setup](https://www.digitalocean.com/community/tutorials/how-to-build-a-rest-api-with-prisma-and-postgresql).

## WebHook set up
`curl -F "url=YOUR-MINI-APP_URL/api/webhook" https://api.telegram.org/botYOUR-BOT-TOKEN/setWebhook`

`https://api.telegram.org/botYOUR-BOT-TOKEN/setWebhook?url=YOUR-MINI-APP-URL/api/webhook`

## GetHook set up
`https://api.telegram.org/botYOUR-BOT-TOKEN/getWebhookInfo`

`https://api.telegram.org/botYOUR-BOT-TOKEN/getMe`

Setting Webhook Reference Url [SetWebHook](https://stackoverflow.com/questions/42554548/how-to-set-telegram-bot-webhook)

# telegram-bot-game
