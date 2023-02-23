import React from "react";

import axios from "axios";

interface Props {}

interface Form {
  username?: string;
  password?: string;
}

const LoginForm = (props: Props) => {
  const usernameRef = React.useRef<HTMLInputElement>(null!);
  const passwordRef = React.useRef<HTMLInputElement>(null!);

  const [message, setMessage] = React.useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get form values
    const username: Form["username"] = usernameRef.current.value;
    const password: Form["password"] = passwordRef.current.value;

    if (username && password) {
      axios
        .post("http://localhost:5000/login", {
          username: username,
          password: password,
        })
        .then((res) => {
          const data: { [key: string]: boolean } = res.data;
          if (res.status === 200 && res.statusText === "OK") {
            if (data && data.accessToken) {
              // Successful login
              setMessage("Correct password!");
              localStorage.setItem("accessToken", data.accessToken.toString());
              window.location.reload();
            }
            if (data && !data.accessToken) {
              // Failed login
              setMessage("Wrong password!");
            }
            if (!data) {
              // User does not exist
              setMessage("User does not exist!");
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
    }
  };

  return (
    <div className="login-form">
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>Username</label>
        <input
          autoFocus
          required
          ref={usernameRef}
          type="text"
          name="username"
        />

        <label>Password</label>
        <input required ref={passwordRef} type="password" name="password" />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
