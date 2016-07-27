"use strict";
var express = require("express");
// import { Application } from "express";
var app = express();
app.get("/user", function (req, res) {
    res.status(200);
    res.json({ name: "lm" });
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = app;

//# sourceMappingURL=app.js.map
