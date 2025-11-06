"use client";

import { Button } from "../ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

export const Navbar = () => {
  const session = useSession();

  const handleLogin = async () => {
    await signIn("google");
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <header className="flex h-16 items-center justify-between border-b px-6 py-2">
      <h1>QnA Forum</h1>

      <div>
        {session.data?.user ? (
          <Button onClick={() => handleLogout()}>Sign Out</Button>
        ) : (
          <Button onClick={() => handleLogin()}>Sign In</Button>
        )}
      </div>
    </header>
  );
};
