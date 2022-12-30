import { libs } from "../libs/index.js";

const root = libs.express.Router();

root.get("/", (req, res) => {
  libs.logger.accessLogger.error("Bad Request");
  res.status(500).send("Bad Request");
});

export { root };
