export const libs = {
  sharp: (await import("sharp")).default,
  axios: (await import("axios")).default,
  log4js: (await import("./log4js.js")).log4js,
  helmet: (await import("helmet")).default,
  figlet: (await import("figlet")).default,
  express: (await import("express")).default,
  logger: (await import("./logger.js")).logger,
};
