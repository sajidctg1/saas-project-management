import Link from "next/link";
import { SiteHeader } from "~/components/layout/site-header";

import { Button } from "~/components/ui/button";
import { AUTH_URI } from "~/features/auth/constants";
import { getSession } from "~/server/helpers";

export default async function HomePage() {
  const session = await getSession();

  return (
    <>
      <SiteHeader />
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-4cl md:text-5cl font-bold tracking-tight lg:text-6xl">
              <p>Your personal workspace</p>
              <p className="tex-5xl md:text-6xl">
                for <span className="text-blue-600">better productivity</span>
              </p>
            </h1>

            <p className="text-muted-foreground mx-auto mt-6 max-w-2xl text-base lg:text-lg">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
              laboriosam consequuntur! Molestiae enim eos laboriosam quia voluptas
            </p>

            <div className="mt-6 flex items-center justify-center gap-4">
              {session?.session ? (
                <Button asChild>
                  <Link href="/workspaces">Goto Workspace</Link>
                </Button>
              ) : (
                <>
                  <Button asChild>
                    <Link href={AUTH_URI.signUp}>Get Started</Link>
                  </Button>

                  <Button asChild variant={"outline"}>
                    <Link href={AUTH_URI.signIn}>Sign in</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
