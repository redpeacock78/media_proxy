export const resourceManage = (req, res, next) => {
  let finished = false;
  let resource = null;
  req.getResource = () => {
    if (finished) throw new Error("Already Finished");
    if (resource === null || resource !== resource) resource = openResource();
    return resource;
  };
  res.on("close", () => {
    if (resource !== null) closeResource(resource);
    finished = true;
  });
  next();
};
