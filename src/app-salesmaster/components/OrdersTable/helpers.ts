export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  let day = date.getDate();
  const month = date.toLocaleString("default", {
    month: "long",
  });

  const time = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  return `${month} ${day}, ${year} at ${time}`;
};
