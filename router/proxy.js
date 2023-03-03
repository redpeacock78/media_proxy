import { libs } from "../libs/index.js";
import { utils } from "../utils/index.js";

const proxy = libs.express.Router();

proxy.get("/", async (req, res) => {
  const url = req.query.url;
  if (url && utils.validURLStringDecision(url)) {
    const config = {
      responseType: "arraybuffer",
      headers: utils.proxyRequestHeaders(req.headers),
    };
    await libs.axios
      .get(url, config)
      .then(async (resp) => {
        const fileName = url.split("/").pop();
        const contentType = resp.headers.getContentType()
          ? resp.headers.getContentType().indexOf("image") === 0
          : utils.imageFileType(resp.data) !== "unknown";
        if (contentType) {
          const webp = libs
            .sharp(resp.data, {
              animated: true,
              quality: 30,
              failOnError: false,
            })
            .webp()
            .toBuffer();
          const convFileName = `${fileName.split(".")[0]}.webp`;
          res
            .set(utils.responseHeader({ fileName: convFileName }))
            .type("webp")
            .send(await webp);
          libs.logger.accessLogger.debug("Suucessfully compressed images!");
        } else {
          libs.logger.accessLogger.debug(
            "Successfully accessed content og unknown content type."
          );
          res.redirect(301, decodeURI(url));
        }
      })
      .catch((e) => {
        if (e.response) {
          libs.logger.accessLogger.error(
            `Request failed with status code ${e.response.status}`
          );
          res.status(e.response.status).send();
        } else {
          libs.logger.accessLogger.error(`Request failed with status code 500`);
          res.status(500).send();
        }
      });
  } else {
    libs.logger.accessLogger.error("Bad Request");
    res.status(500).send("Bad Request");
  }
});

export { proxy };
