const { createServer } = require("http");
const httpProxy = require("http-proxy");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

// const proxy = httpProxy.createProxyServer();
// const target = "http://localhost:3001";

app.prepare().then(() => {
    createServer((req, res) => {
        const parsedUrl = parse(req.url, true);
        // const { pathname, query } = parsedUrl;

        handle(req, res, parsedUrl);
    }).listen(3000, err => {
        if (err) throw err;
        console.log("> Ready on http://localhost:3000");
    });
});