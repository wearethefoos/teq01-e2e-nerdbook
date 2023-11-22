"use client";

import { useEffect, useState } from "react";

import { Logout } from "components/auth/Logout";

export const MainNavigation = () => {
  const [loggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <nav className="flex flex-row justify-between bg-teal-500 dark:bg-teal-900">
      <ul className="flex gap-4 p-4 items-center">
        <li>
          <a href="/">Home</a>
        </li>
      </ul>
      <ul className="flex gap-4 p-4 items-center">
        {!loggedIn && (
          <>
            <li>
              <a id="signUpNav" href="/signup">
                Sign Up
              </a>
            </li>
            <li>
              <a id="loginNav" href="/login">
                Log In
              </a>
            </li>
          </>
        )}
        {loggedIn && (
          <li>
            <Logout />
          </li>
        )}
      </ul>
    </nav>
  );
};
