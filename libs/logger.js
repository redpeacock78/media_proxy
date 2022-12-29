import { log4js } from "./index.js";

const systemLogger = log4js.getLogger("[SYSTEM]");
const accessLogger = log4js.getLogger("[ACCESS]");

export { systemLogger, accessLogger };
