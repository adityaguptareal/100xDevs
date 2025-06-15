"use client"
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <SessionProvider>
      <RealHome />
    </SessionProvider>
  )
}

function RealHome() {
  const session = useSession()
  return (
    <div>
      {session.status === "authenticated" && <button onClick={() => signOut()}>Sign Out {session.data.user?.name} </button>}
      {session.status === "unauthenticated" && <button onClick={() => signIn()}>Signin  </button>}
    </div>

  );
}
