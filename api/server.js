const express = require("express");

const friendsRouter = require("../friends/friends-router");

const server = express();

server.use(express.json());

server.use("/api/friends", friendsRouter);

server.get("/", (req, res) => {
	res.status(200).json({ api: "running" });
});

module.exports = server;
