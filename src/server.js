import express from "express";
import WebSocket , {WebSocketServer} from "ws";
import http from "http";
import * as console from "console";


const app = express();
app.set("view engine", "pug");
app.set("views", __dirname +"/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const sockets = [];
wss.on("connection" , (socket) => {
    sockets.push(socket);
    socket["nickname"] = "Anon";
    console.log("Connected to Browser");
    socket.on("close", () => console.log("Disconnected from the Browser"));
    socket.on("message", (msg) => {
        const message = JSON.parse(msg);
        switch(message.type){
            case "new_message":
                sockets.forEach((aSocket) =>aSocket.send(`${socket.nickname} : ${message.payload}`));
            case "nickname":
                socket["nickname"] = message.payload;
        }
    });


});

server.listen(3000, handleListen); // http 서버 위에 ws 서버 만들고 내 http 서버에 access
