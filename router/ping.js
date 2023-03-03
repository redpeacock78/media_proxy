import { libs } from "../libs/index.js";

const ping = libs.express.Router();

ping.get("/", (req, res) => {
  libs.logger.accessLogger.debug("PING Status: Success");
  res.status(200).send("OK");
});

export { ping };
