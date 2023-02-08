import axios from "axios";

// const getToken = (cookieID: string) => {
//   const name = cookieID + "=";
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const ca = decodedCookie.split(";");
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) === " ") {
//       c = c.substring(1);
//     }
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return "";
// };

const accessToken: string = localStorage.getItem("accessToken") || "";

// Check if user is logged in
const auth: () => Promise<
  | void
  | {
      isAuth: boolean;
      user: string;
    }
  | {
      isAuth: boolean;
      user?: undefined;
    }
  | undefined
> = async () => {
  return axios
    .post(
      "http://localhost:5000/auth",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((res) => {
      const data: { [key: string]: string } = res.data;
      if (res.status === 200 && res.statusText === "OK") {
        if (data.redirect === "user") {
          return { isAuth: true, userData: data.user };
        } else {
          return { isAuth: false };
        }
      }
    })
    .catch((error) => {
      // Fail
      console.log(error);
    })
    .finally(() => {
      // Finally
    });
};

export default auth;
