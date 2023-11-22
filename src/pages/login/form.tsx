"use client";

import { apiUrl, useApi } from "lib/api";
import axios, { Axios } from "axios";
import { useCallback, useEffect, useState } from "react";

import Button from "components/actions/Button";
import FormField from "components/forms/FormField";
import Link from "next/link";

type LoginErrors = {
  email?: string;
  password?: string;
  error?: string;
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const { data, error, mutate } = useApi<{ id: number }>("/me");

  useEffect(() => {
    if (data?.id) {
      window.location.href = "/";
    }
  }, [data]);

  const submitForm = useCallback(async () => {
    if (Object.values(errors).length > 0) return;

    try {
      const {
        data: { jwt },
      } = await axios.post(apiUrl("/login"), {
        email,
        password,
      });

      localStorage.setItem("token", jwt);

      mutate();
    } catch (e: any) {
      console.error(e);
      if (e.response?.data?.error) {
        setErrors({
          ...errors,
          error: e.response.data.error,
        });
      }
    }
  }, [mutate, email, password, errors]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    submitForm();
  };

  console.table(errors);

  return (
    <div className="border border-teal-500 rounded-md p-6">
      {errors.error && (
        <div id="signupError" className="text-red-500 text-lg italic mb-2 p-2">
          <h2 className="font-bold">There was an error logging you in:</h2>
          <p>{errors.error}</p>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <FormField
          label="Email"
          type="text"
          value={email}
          onChange={setEmail}
        />
        <FormField
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
        />
        <div className="flex flex-row items-center justify-end gap-4 my-2 p-2">
          <Link href="/signup">Sign up</Link>
          <Button id="loginButton" onClick={submitForm} type="submit">
            Log in
          </Button>
        </div>
      </form>
    </div>
  );
}
