import { libs } from "./libs/index.js";
import { router } from "./router/index.js";
import { middleware } from "./middleware/index.js";

const app = libs.express();

app.use(libs.helmet.hsts());
app.use(libs.helmet.hidePoweredBy());
app.use(middleware.cors);
app.use(middleware.resourceManage);
app.use(libs.log4js.connectLogger(libs.logger.accessLogger));

app.use("/", router.root);
app.use("/ping", router.ping);
app.use("/proxy", router.proxy);

app.listen(process.env.PORT, () => {
  console.info(
    `${libs.figlet.textSync("MediaProxy", { font: "Rectangles" })}\n`
  );
  libs.logger.systemLogger.info("Server Start");
});
