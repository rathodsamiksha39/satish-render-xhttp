const http = require("http");
const httpProxy = require("http-proxy");

// 🔴 CHANGE THIS → your VPS backend
const TARGET = "http://india.satishcdn.com"; 

const proxy = httpProxy.createProxyServer({
  target: TARGET,
  changeOrigin: true,
  ws: true
});

const server = http.createServer((req, res) => {
  // optional: restrict path
  if (req.url.startsWith("/t.me/satishwpawar")) {
    proxy.web(req, res);
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

// WebSocket / XHTTP upgrade
server.on("upgrade", (req, socket, head) => {
  if (req.url.startsWith("/t.me/satishwpawar")) {
    proxy.ws(req, socket, head);
  } else {
    socket.destroy();
  }
});

// Render dynamic port
const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
