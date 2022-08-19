require("dotenv").config();
const express = require("express");
const axios = require("axios");
const TelegramBot = require('node-telegram-bot-api');
const app = express();

express.json({ extended: true });

const {TOKEN,SERVER_URL} = process.env;
// const TELEGRAM_API = "https://api.telegram.org/bot"+TOKEN;
// const URI = `/webhook/${TOKEN}`;
// const WEBHOOK_URL = SERVER_URL+URI;

// const init = async () => {
//     const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
//     console.log(res.data);
// };

// app.post(URI,async (req,res) => {
//     const updates = await axios.get(`${TELEGRAM_API}/getUpdates`);
//     console.log("response");
//     console.log(updates.data);
//     console.log("body");
//     console.log(req.body);
// });

const bot = new TelegramBot(TOKEN, {polling: true});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const message = msg.text;
    let age = 2022 - parseInt(message);
    if(age < 18){
        bot.sendMessage(chatId, "You are too young");
    }else if(age > 18 && age < 30){
        bot.sendMessage(chatId, "You are young");
    }else if(age > 30 && age < 50){
        bot.sendMessage(chatId, "You are middle");
    }else if(age > 50 && age < 70){
        bot.sendMessage(chatId, "You are old");
    }else if(age > 70){
        bot.sendMessage(chatId, "You are very old");
    }
});

const port = process.env.PORT || 3001;
app.listen(port, async () => {
    console.log(`Listening on port ${port}`);
    // await init();
});