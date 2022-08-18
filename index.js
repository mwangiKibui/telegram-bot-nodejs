require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();

express.json();

const {TOKEN,SERVER_URL} = process.env;
const TELEGRAM_API = "https://api.telegram.org/bot"+TOKEN;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL+URI;

const init = async () => {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
    console.log(res.data);
};

app.post(URI,async (req,res) => {
    console.log("request",req);
    const {body} = req;
    console.log(body);
});

app.post("/hook",async (req,res) => {
    console.log("hook request",req);
    const {body} = req;
    console.log(body);
});

const port = process.env.PORT || 3001;
app.listen(port, async () => {
    console.log(`Listening on port ${port}`);
    await init();
});