export const middleware = {
  cors: (await import("./cors.js")).cors,
  resourceManage: (await import("./resourceManage.js")).resourceManage,
};
