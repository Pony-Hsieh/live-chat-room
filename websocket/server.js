// import express 和 ws 套件
const express = require("express");
const SocketServer = require("ws").Server;
const PORT = 3000;

// 創建 express 物件，綁定監聽 port
const server = express().listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});

// 將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server });

// 當有 client 連線成功時
wss.on("connection", (ws) => {
  console.log("Client connected");

  // 當收到 client 消息時
  ws.on("message", (data) => {
    // 收回來是 Buffer 格式、需轉成字串
    // data = JSON.parse(data.toString());
    // data = data.toJSON();
    data = data.toString();
    console.log(data); // 可在 terminal 看收到的訊息

    // Step: 發送給所有client
    const clients = wss.clients; // 取得所有連接中的 client
    clients.forEach((client) => {
      // 發送消息給client
      client.send(data);
    });
  });

  // 當連線關閉
  ws.on("close", () => {
    console.log("Close connected");
  });
});
