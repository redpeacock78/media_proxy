export const imageFileType = (arrayBuffer) => {
  const ba = new Uint8Array(arrayBuffer);
  let headerStr = "";
  let headerHex = "";
  for (let i = 0; i < 10; i++) {
    headerHex += ba[i].toString(16);
    headerStr += String.fromCharCode(ba[i]);
  }
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
