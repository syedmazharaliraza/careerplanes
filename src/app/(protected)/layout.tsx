import { redirect } from "next/navigation";
import { getUserFromSession } from "@/lib/auth";
import LogoutButton from "@/components/LogoutButton";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserFromSession();

  if (!user) {
    redirect("/signin");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full z-40 bg-background">
        <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-2 items-center">
          <div>
            <Link href="/dashboard">
              <Image
                src="/assets/cp-logo.png"
                width={311}
                height={110}
                alt="Career Planes logo"
                className="w-[250px] lg:w-[150px]"
              />
            </Link>
          </div>
          <div className="flex justify-end w-full gap-4 items-center">
            <span className="text-sm font-medium mr-2">{user.name}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
