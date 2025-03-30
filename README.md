This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).  

## **Getting Started**  

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

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.  

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.  

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.  

## **Setting Up Your Telegram Bot & Mini App**  

### **1. Create a New Bot on Telegram**  
To create a new Telegram bot, follow these steps:  

1. Open [BotFather](https://telegram.me/BotFather).  
2. Type `/newbot` and send it.  
3. Enter a name for your bot.  
4. Choose a unique **username** for your bot (must end in `"bot"`, e.g., `MyGameBot`).  
5. BotFather will generate an **API token**—save this for later.  

### **2. Create a Mini App for Your Bot**  
To register a Telegram **Mini App**, follow these steps:  

1. In **BotFather**, type `/newapp` and send it.  
2. Follow the instructions and enter your **Hosted Web App URL**.  
3. Choose a **short name** for your app.  

### **3. Create a Telegram Channel**  
1. Create a new **Telegram Channel** (Private or Public).  
2. Add your bot as an **administrator** in the channel.  
3. Users must join this channel before launching the game.  

## **Environment Variables (`.env` Setup)**  

Create a `.env` file in the root of your project and add the following values:  

```ini
POSTGRES_PRISMA_URL=YOUR_POSTGRES_DATABASE_URL?schema=public
POSTGRES_URL_NON_POOLING=YOUR_POSTGRES_DATABASE_URL

NEXT_PUBLIC_TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_API_TOKEN
NEXT_PUBLIC_TELEGRAM_BOT_LINK=YOUR_BOT_LINK

NEXT_PUBLIC_TELEGRAM_CHANNEL_URL="YOUR_CHANNEL_URL"
NEXT_PUBLIC_TELEGRAM_CHANNEL_USERNAME="@YOUR_CHANNEL_USERNAME"

NEXT_PUBLIC_TELEGRAM_MINI_APP_URL="YOUR_MINI_APP_URL"

NEXT_PUBLIC_TELEGRAM_BOT_API_LINK="https://api.telegram.org/bot"
NEXT_PUBLIC_TELEGRAM_BOT_PHTO_LINK="https://api.telegram.org/file/bot"
```

Replace the placeholder values (`YOUR_...`) with your actual credentials.  

## **Prisma Migrate**  

Check out this reference: [Prisma Setup](https://www.digitalocean.com/community/tutorials/how-to-build-a-rest-api-with-prisma-and-postgresql).  

## **WebHook Setup**  

Run the following command to set up the Telegram webhook:  

```bash
curl -F "url=YOUR-MINI-APP_URL/api/webhook" https://api.telegram.org/botYOUR-BOT-TOKEN/setWebhook
```

Alternatively, use:  

```bash
https://api.telegram.org/botYOUR-BOT-TOKEN/setWebhook?url=YOUR-MINI-APP-URL/api/webhook
```

Check webhook info:  

```bash
https://api.telegram.org/botYOUR-BOT-TOKEN/getWebhookInfo
https://api.telegram.org/botYOUR-BOT-TOKEN/getMe
```

Reference: [SetWebHook](https://stackoverflow.com/questions/42554548/how-to-set-telegram-bot-webhook).  

## **Run as a Service with PM2**  

```bash
pm2 start "npm start" --name "telegram-mini-app"
pm2 startup
pm2 save
```

## **Test Telegram Bot API**  

You can test the bot API here: [Bot API](https://josxa.stoplight.io/docs/bot-api/YXBpOjY4Njcz-telegram-bot-api).  

### **Deploy on Vercel**  

The easiest way to deploy your Next.js app is to use [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).  

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.