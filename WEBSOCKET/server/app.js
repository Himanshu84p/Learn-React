import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

const port = 8080;
const app = express();
const server = createServer(app);


//if we set the httpOptions true then on frontend side we can't set cookie using document.cookie
//io means whole circuit which contain the all the sockets
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());

io.on("connection", (socket) => {
  console.log(" user connected id", socket.id);

  //event for getting the message
  socket.on("message", ({ room, message }) => {
    // console.log(data);
    socket.to(room).emit("receive-message", message);
  });

  //listening the private room emit
  socket.on("private-room", (privateRoom) => {
    socket.join(privateRoom);
    console.log(`${socket.id} joined the ${privateRoom}`);
  });

  //event for disconnect
  socket.on("disconnect", () => {
    console.log(`${socket.id} disconnected from the server`);
    console.log(`----------------------------------------------------------`);
  });

  //emit event to make a event with name and data that we can get on frontend side with the same event name
  // socket.emit("welcome", `WElcome to the socket server ${socket.id}`);

  //in broadcast which ever socket is sending msg except it all the socket will get msg
  // socket.broadcast.emit("welcome", ` ${socket.id} joined the server`);
});

//TODO we have to listen on the server not app

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
