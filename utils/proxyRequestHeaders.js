export const proxyRequestHeaders = (headers) => {
  const requestHeaders = Object.assign({}, headers);
  const cfHeader = Object.keys(requestHeaders).filter((i) => i.match(/^cf-/g));
  const xForwarded = Object.keys(requestHeaders).filter((i) =>
    i.match(/^x-forwarded-/g)
  );
  const removeHeaders = [
    "host",
    "authorization",
    "cookie",
    "cdnloop",
    ...cfHeader,
    ...xForwarded,
  ];
  removeHeaders.forEach((key) => delete requestHeaders[key]);
  return requestHeaders;
};
