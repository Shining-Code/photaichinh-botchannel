require("dotenv").config();
const WebSocket = require("ws");
const { send2Channel } = require("./bot");

const ws = new WebSocket("ws://localhost:9877/ws");

ws.on("open", function open() {
  console.log("WebSocket connected");

  ws.on("message", function incoming(message) {
    const json = JSON.parse(message.toString());
    const { type, data } = json;
    if (type === "news") {
      send2Channel(data.translate);
    }
  });
});
