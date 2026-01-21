import { createServer } from "https";
import { readFileSync } from "fs";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync("./certs/localhost-key.pem"),
  cert: readFileSync("./certs/localhost.pem"),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => handle(req, res)).listen(3000, () => {
    console.log("✅ HTTPS dev server running: https://localhost:3000");
  });
});
