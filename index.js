const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// Telegram Bot setup
const token = process.env.TELEGRAM_BOT_TOKEN;
const webhookUrl = process.env.VERCEL_URL + '/webhook'; // Replace with your Vercel URL

const bot = new TelegramBot(token, { webhookUrl });

// Set up webhook
bot.setWebHook(webhookUrl)
  .then(() => console.log('Webhook set up'))
  .catch((error) => console.error('Webhook setup failed:', error));

// Webhook handler
app.post('/webhook', (req, res) => {
  bot.processUpdate(req.body)
    .then(() => res.sendStatus(200))
    .catch((error) => {
      console.error('Error processing update:', error);
      res.sendStatus(500);
    });
});

// Example route (optional, for testing)
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});