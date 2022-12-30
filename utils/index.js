export const utils = {
  imageFileType: (await import("./imageFileType.js")).imageFileType,
  responseHeader: (await import("./responseHeader.js")).responseHeader,
  proxyRequestHeaders: (await import("./proxyRequestHeaders.js"))
    .proxyRequestHeaders,
  validURLStringDecision: (await import("./validURLStringDecision.js"))
    .validURLStringDecision,
};
