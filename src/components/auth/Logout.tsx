"use client";

import Button from "components/actions/Button";

export const Logout = () => {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (!localStorage.getItem("token")) return null;

  return <Button onClick={logout}>Log out</Button>;
};
