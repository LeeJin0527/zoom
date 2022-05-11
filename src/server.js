import express from "express";
import WebSocket , {WebSocketServer} from "ws";
import http from "http";


const app = express();
app.set("view engine", "pug");
app.set("views", __dirname +"/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
function handleConnection(socket) {
    console.log(socket);
}

wss.on("connection" , handleConnection); // on method : 이벤트를 기다림

server.listen(3000, handleListen); // http 서버 위에 ws 서버 만들고 내 http 서버에 access
