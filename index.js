require("dotenv").config();
const WebSocket = require("ws");
const { send2Channel } = require("./bot");
const axios = require("axios");
const { insertNews } = require("./controller/news.controller");

const ws = new WebSocket(process.env.WS_URL);

ws.on("open", function open() {
  console.log("WebSocket connected");
  ws.send("连接成功");
  setInterval(() => {
    ws.send("保持心跳");

    // fetch news
    axios
      .post(process.env.API_URL, {
        limit: 20,
        page: 1,
      })
      .then((response) => {
        if (response.data.code !== 200) {
          console.error("Error fetching news:", response.data);
          return;
        }
        insertNews(response.data.data.list);
      })
      .catch((error) => {
        console.error("Error fetching news:", error.message);
      });
  }, 60 * 1000);
});

ws.on("message", async function incoming(data) {
  const json = JSON.parse(data.toString());
  console.log(`Received: ${json.data}`);
  if (json.type === 1) {
    await insertNews(json.data);
  }
});

ws.on("close", function close() {
  console.log("disconnected");
});
