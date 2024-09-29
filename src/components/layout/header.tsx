"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export const Header = () => {
  const router = useRouter();

  return (
    <header className="w-full z-40 bg-background">
      <div className="container relative mx-auto min-h-20 flex justify-between items-center">
        <Link href="/">
          <Image
            src="/assets/cp-logo.png"
            width="311"
            height="110"
            alt="logo"
            className="w-[150px]"
          />
        </Link>
        <Button variant="outline" onClick={() => router.push("/signin")}>
          Sign in
        </Button>
      </div>
    </header>
  );
};
