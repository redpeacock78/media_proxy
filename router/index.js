export const router = {
  root: (await import("./root.js")).root,
  proxy: (await import("./proxy.js")).proxy,
};
