export const router = {
  root: (await import("./root.js")).root,
  ping: (await import("./ping.js")).ping,
  proxy: (await import("./proxy.js")).proxy,
};
