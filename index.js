import {
  sharp,
  axios,
  figlet,
  helmet,
  express,
  log4js,
  imageFileType,
} from "./libs/index.js";
import { resourceManage } from "./middleware/index.js";
import { responseHeader, proxyRequestHeaders } from "./utils/index.js";

const systemLogger = log4js.getLogger("[SYSTEM]");
const accessLogger = log4js.getLogger("[ACCESS]");

const app = express();

app.use(resourceManage);
app.use(helmet.hsts());
app.use(helmet.hidePoweredBy());
app.use(log4js.connectLogger(accessLogger));

app.get("/", (req, res) => {
  accessLogger.error("Bad Request");
  res.status(500).send("Bad Request");
});

app.get("/proxy", async (req, res) => {
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

app.listen(3000, () => {
  console.info(`${figlet.textSync("MediaProxy", { font: "Rectangles" })}\n`);
  systemLogger.info("Server Start");
});
