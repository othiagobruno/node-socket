import http from "http";
import IO from "socket.io";
import express from "express";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const server = http.createServer(app);
const io = new IO.Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on(
    "requestMicrophone",
    ({ id, payload }: { id: string; payload: any }) => {
      console.log("requestMicrophone", id, payload);
      io.sockets.emit(`requestMicrophone:${id}`, payload);
    }
  );

  socket.on(
    "dispararPerguntas",
    ({ id, payload }: { id: string; payload: any }) => {
      console.log("dispararPerguntas", id, payload);
      io.sockets.emit(`dispararPerguntas:${id}`, payload);
    }
  );

  socket.on(
    "deslogarTodoMundo",
    ({ id, payload }: { id: string; payload: any }) => {
      console.log("deslogarTodoMundo", id, payload);
      io.sockets.emit(`deslogarTodoMundo:${id}`, payload);
    }
  );
});

server.listen(3333, () => {
  console.log("server is running on port", server.address());
});
