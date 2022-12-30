export const proxyRequestHeaders = (headers) => {
  const requestHeaders = Object.assign({}, headers);
  [
    "host",
    "authorization",
    "cookie",
    "cdnloop",
    ...Object.keys(requestHeaders).filter((i) => i.match(/^cf-/g)),
    ...Object.keys(requestHeaders).filter((i) => i.match(/^x-forwarded-/g)),
  ].forEach((key) => delete requestHeaders[key]);
  return requestHeaders;
};
