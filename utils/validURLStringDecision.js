export const validURLStringDecision = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
