"use client";

import { useApi } from "lib/api";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Homepage() {
  const { data, error, isLoading, isValidating } = useApi<{ id: number }>(
    "/me"
  );
  const router = useRouter();

  useEffect(() => {
    if (!router || isLoading || isValidating) return;

    if (error || !data?.id) {
      console.log("redirecting to login");
      router.push("/login");
    }
  }, [data, error, isLoading, isValidating, router]);

  return (
    <div className="flex flex-col max-w-md mx-auto my-12">
      <h1 className="font-sans font-bold text-5xl mb-6">
        Welcome to NerdBook!
      </h1>
    </div>
  );
}
