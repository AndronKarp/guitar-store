export const removeNonNumbers = str => str.replace(/[^0-9]/gi, "");

export const formatWithSpaces = (str, step = 1) => {
  const result = [];
  for (let i = 0; i < str.length; i += step)
    result.push(str.slice(i, i + step));
  return result.join(" ");
};
