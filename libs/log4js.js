import log4js from "log4js";

log4js.configure({
  appenders: { out: { type: "stdout", layout: { type: "basic" } } },
  categories: { default: { appenders: ["out"], level: "all" } },
  pm2: true,
  disableClustering: true,
});

export { log4js };
