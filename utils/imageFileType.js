export const imageFileType = (arrayBuffer) => {
  const ba = new Uint8Array(arrayBuffer);
  const headerHex = [...Array(10).keys()]
    .map((i) => ba[i].toString(16))
    .join("");
  const headerStr = [...Array(10).keys()]
    .map((i) => String.fromCharCode(ba[i]))
    .join("");
  if (headerHex.indexOf("ffd8") != -1) {
    return "JPG";
  } else if (headerStr.indexOf("PNG") != -1) {
    return "PNG";
  } else if (headerStr.indexOf("GIF") != -1) {
    return "GIF";
  } else if (headerStr.indexOf("BM") != -1) {
    return "BMP";
  } else {
    return "unknown";
  }
};
