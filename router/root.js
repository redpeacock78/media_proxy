import { express, accessLogger } from "../libs/index.js";

const root = express.Router();

root.get("/", (req, res) => {
  accessLogger.error("Bad Request");
  res.status(500).send("Bad Request");
});

export { root };
