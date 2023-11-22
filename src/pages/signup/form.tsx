"use client";

import { apiUrl, useApi } from "lib/api";
import axios, { Axios } from "axios";
import { useCallback, useEffect, useState } from "react";

import Button from "components/actions/Button";
import FormField from "components/forms/FormField";
import Link from "next/link";

type SignupErrors = {
  name?: string;
  email?: string;
  password?: string;
  passwordConfirmation?: string;
  error?: string;
};

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState<SignupErrors>({});
  const { data, error, mutate } = useApi<{ id: number }>("/me");

  console.log("data", data);

  useEffect(() => {
    if (data?.id) {
      window.location.href = "/";
    }
  }, [data]);

  const checkPasswordConfirmation = useCallback(() => {
    if (password !== passwordConfirmation) {
      setErrors((errors) => ({
        ...errors,
        passwordConfirmation: "Passwords do not match",
      }));
      return false;
    }

    setErrors((errors) => ({
      ...errors,
      passwordConfirmation: undefined,
    }));
    return true;
  }, [password, passwordConfirmation]);

  const submitForm = useCallback(async () => {
    if (Object.values(errors).filter((err) => !!err).length > 0) return;

    try {
      const {
        data: { jwt },
      } = await axios.post(apiUrl("/signup"), {
        name,
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
  }, [mutate, name, email, password, errors]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    submitForm();
  };

  console.table(errors);

  return (
    <div className="border border-teal-500 rounded-md p-6">
      {errors.error && (
        <div id="signupError" className="text-red-500 text-lg italic mb-2 p-2">
          <h2 className="font-bold">
            There was an error creating your account:
          </h2>
          <p>{errors.error}</p>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <FormField label="Name" type="text" value={name} onChange={setName} />
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
          onKeyUp={checkPasswordConfirmation}
          onChange={setPassword}
        />
        <FormField
          label="Confirm Password"
          type="password"
          value={passwordConfirmation}
          onKeyUp={checkPasswordConfirmation}
          onChange={setPasswordConfirmation}
          error={errors.passwordConfirmation}
        />
        <div className="flex flex-row items-center justify-end gap-4 my-2 p-2">
          <Link href="/login">Log in</Link>
          <Button id="signupButton" onClick={submitForm} type="submit">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
}
