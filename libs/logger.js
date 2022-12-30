import { log4js } from "./log4js.js";

export const logger = {
  systemLogger: log4js.getLogger("[SYSTEM]"),
  accessLogger: log4js.getLogger("[ACCESS]"),
};
