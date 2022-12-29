import {
  figlet,
  helmet,
  express,
  log4js,
  systemLogger,
  accessLogger,
} from "./libs/index.js";
import { resourceManage } from "./middleware/index.js";
import { root, proxy } from "./router/index.js";

const app = express();

app.use(resourceManage);
app.use(helmet.hsts());
app.use(helmet.hidePoweredBy());
app.use(log4js.connectLogger(accessLogger));

app.use("/", root);
app.use("/proxy", proxy);

app.listen(3000, () => {
  console.info(`${figlet.textSync("MediaProxy", { font: "Rectangles" })}\n`);
  systemLogger.info("Server Start");
});
