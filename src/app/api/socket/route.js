import { Server } from "socket.io";

let io;

export const GET = async (req) => {
  if (!io) {
    console.log("Starting new Socket.IO server...");
    io = new Server(globalThis.serverSocket ?? {}, {
      path: "/api/socket",
      addTrailingSlash: false,
      cors: { origin: "*" },
    });
    globalThis.serverSocket = io;

    io.on("connection", (socket) => {
      console.log("Client connected");

      // Example: trigger reload manually
      socket.emit("reload");

      socket.on("disconnect", () => {
        console.log("Client disconnected");
      });
    });
  }

  return new Response("Socket.IO server running", { status: 200 });
};
