import axios from "axios";

import AxiosInterceptor from "./AxiosInterceptor";

AxiosInterceptor;

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
    .post("http://localhost:5000/api/auth/authorize")
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
