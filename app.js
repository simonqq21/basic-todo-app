// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const http = require("http");
// var cors = require("cors");

import createError from "http-errors";
import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import http from "http";
import { Sequelize, DataTypes, Model } from "sequelize";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);
console.log(__filename);

// const { Sequelize } = require("sequelize");
dotenv.config();

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";
import notesRouter from "./routes/notes.js";

var app = express();

app.use(cors());
console.log(`password = ${process.env.PASSWORD}`);
// console.log(`backend port = ${process.env.PORT}`);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/notes", notesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err || 500);
  res.render("error");
});

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`);
});
export default app;
