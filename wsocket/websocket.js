const WebSocket = require("ws");
const { encode } = require("@msgpack/msgpack");

const server = new WebSocket.Server({ port: process.env.WS_PORT });

var clients = [];
server.on("connection", (ws) => {
  console.log("WS:New client connected");
  clients.push(ws);
  ws.on("message", (message) => {
    console.log(`WS:Received message: ${message}`);
  });

  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
    console.log("WS:Client disconnected");
  });
});
console.log(
  `WebSocket server is running on ws://localhost:${process.env.WS_PORT}`
);

function broadcast(message) {
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(encode(message));
    }
  });
}

module.exports = {
  broadcast,
};
