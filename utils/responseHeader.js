export const responseHeader = ({ fileName }) => {
  return {
    "Content-Disposition": `inline; filename=${fileName}`,
  };
};
