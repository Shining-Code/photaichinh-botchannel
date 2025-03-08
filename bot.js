const TelegramBot = require("node-telegram-bot-api");

const token = process.env.TELEGRAM_BOT_TOKEN;
const channelId = "-1002347647314";
const bot = new TelegramBot(token, {
  polling: true,
  request: {
    agentOptions: {
      keepAlive: true,
      family: 4,
    },
  },
});

async function send2Channel(message) {
  return bot.sendMessage(channelId, message);
}

module.exports = {
  send2Channel,
};
