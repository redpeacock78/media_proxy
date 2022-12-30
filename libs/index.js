import sharp from "sharp";
import axios from "axios";
import figlet from "figlet";
import helmet from "helmet";
import express from "express";
import { log4js } from "./log4js.js";
import { logger } from "./logger.js";

export const libs = {
  sharp: sharp,
  axios: axios,
  log4js: log4js,
  helmet: helmet,
  figlet: figlet,
  express: express,
  logger: logger,
};
