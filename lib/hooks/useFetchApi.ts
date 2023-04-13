import { useSession } from "next-auth/react";

export const useFetchApi = (url: string) => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
  }

  const displaySession = () => {
    console.log("session", session);
  };

  return { displaySession };
};
