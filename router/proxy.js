import { sharp, axios, express, accessLogger } from "../libs/index.js";
import {
  imageFileType,
  responseHeader,
  proxyRequestHeaders,
} from "../utils/index.js";

const proxy = express.Router();

proxy.get("/", async (req, res) => {
  const url = req.query.url;
  if (url) {
    const config = {
      responseType: "arraybuffer",
      headers: proxyRequestHeaders(req.headers),
    };
    await axios
      .get(url, config)
      .then(async (resp) => {
        const fileName = url.split("/").pop();
        const contentType = resp.headers.getContentType()
          ? resp.headers.getContentType().indexOf("image") === 0
          : imageFileType(resp.data) !== "unknown";
        if (contentType) {
          const webp = sharp(resp.data, { animated: true }).webp().toBuffer();
          const convFileName = `${fileName.split(".")[0]}.webp`;
          accessLogger.debug("Suucessfully compressed images!");
          res
            .set(responseHeader({ fileName: convFileName }))
            .type("webp")
            .send(await webp);
        } else {
          accessLogger.debug(
            "Successfully accessed content og unknown content type."
          );
          res.redirect(301, decodeURI(url));
        }
      })
      .catch((e) => {
        if (e.response) {
          accessLogger.error(
            `Request failed with status code ${e.response.status}`
          );
          res.status(e.response.status).send();
        } else {
          accessLogger.error(`Request failed with status code 500`);
          res.status(500).send();
        }
      });
  } else {
    accessLogger.error("Bad Request");
    res.status(500).send("Bad Request");
  }
});

export { proxy };
