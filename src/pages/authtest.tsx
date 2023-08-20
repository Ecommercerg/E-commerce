/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { signIn } from "next-auth/react";
import React, { useCallback, useState } from "react";

const Authtest = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: `/success`,
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  return (
    <div>
      <input
        type="text"
        onChange={(e: any) => {
          setEmail(e.target.value);
        }}
        value={email}
      />
      <input
        type="password"
        onChange={(e: any) => {
          setPassword(e.target.value);
        }}
        value={password}
      />
      <button onClick={login}>Login</button>
      <button
        onClick={() => {
          signIn("google", { callbackUrl: "/success" });
        }}
      >
        Login with google
      </button>
    </div>
  );
};

export default Authtest;
