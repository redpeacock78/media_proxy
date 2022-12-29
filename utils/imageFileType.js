export const imageFileType = (arrayBuffer) => {
  const ba = new Uint8Array(arrayBuffer);
  const headerHex = [...Array(10).keys()]
    .map((i) => ba[i].toString(16))
    .join("");
  const headerStr = [...Array(10).keys()]
    .map((i) => String.fromCharCode(ba[i]))
    .join("");
  let fileType = "unknown";
  if (headerHex.indexOf("ffd8") != -1) {
    fileType = "JPG";
  } else if (headerStr.indexOf("PNG") != -1) {
    fileType = "PNG";
  } else if (headerStr.indexOf("GIF") != -1) {
    fileType = "GIF";
  } else if (headerStr.indexOf("BM") != -1) {
    fileType = "BMP";
  }
  return fileType;
};
