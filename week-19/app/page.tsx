
"use client"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Home() {
  const router = useRouter()
  return (
    <div className="w-screen h-screen text-2xl flex justify-center items-center">
      Todo Application
      <div>
        <Link href={"/about"}> Hi Aditya</Link>
        <Link href={"/signin"}> Sign in Button</Link>
        <button onClick={() => {
          router.push("/signup")
        }}></button>
      </div>
    </div>
  );
}
