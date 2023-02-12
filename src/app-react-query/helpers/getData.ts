export default async function getData() {
  // return await fetch(`http://localhost:5000/api/users`, {
  return await fetch(`https://www.boredapi.com/api/activity`, {
    // *GET, POST, PUT, DELETE
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    // For POST/PUT requests
    // body: JSON.stringify({ key: "value" }),
  })
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => {
      // Failure
    });
}
