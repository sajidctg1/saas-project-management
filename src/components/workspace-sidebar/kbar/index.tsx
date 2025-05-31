"use client";
import {
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarProvider,
  KBarResults,
  KBarSearch,
  useMatches,
} from "kbar";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

import { dashboardConfig } from "~/configs/dashboard-config";

import { ResultItem } from "./result-item";
import { useKbarThemeSwitching } from "./use-theme-switching";

export const KBar = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const navigateTo = (url: string) => {
    router.push(url);
  };

  // These action are for the navigation
  const actions = useMemo(
    () =>
      dashboardConfig.mainNav.flatMap((navItem) => {
        // Only include base action if the navItem has a real URL and is not just a container
        const baseAction =
          navItem.href !== "#"
            ? {
                id: `${navItem.title.toLowerCase()}Action`,
                name: navItem.title,
                //shortcut: navItem.shortcut,
                keywords: navItem.title.toLowerCase(),
                section: "Navigation",
                subtitle: `Go to ${navItem.title}`,
                perform: () => navigateTo(navItem.href ?? "#"),
              }
            : null;
        // Return only valid actions (ignoring null base actions for containers)
        return baseAction ? [baseAction] : [];
      }),
    []
  );

  return (
    <KBarProvider actions={actions}>
      <KBarComponent>{children}</KBarComponent>
    </KBarProvider>
  );
};

const KBarComponent = ({ children }: { children: React.ReactNode }) => {
  useKbarThemeSwitching();
  const { results, rootActionId } = useMatches();

  return (
    <>
      <KBarPortal>
        <KBarPositioner className="scrollbar-hide fixed inset-0 z-[99999] bg-black/80 !p-0 backdrop-blur-sm">
          <KBarAnimator className="bg-background text-foreground relative !mt-64 w-full max-w-[600px] !-translate-y-12 overflow-hidden rounded-lg border shadow-lg">
            <div className="bg-background">
              <div className="border-x-0 border-b-2">
                <KBarSearch className="bg-background w-full border-none px-6 py-4 text-lg outline-none focus:ring-0 focus:ring-offset-0 focus:outline-none" />
              </div>
              <KBarResults
                items={results}
                onRender={({ item, active }) =>
                  typeof item === "string" ? (
                    <div className="text-primary-foreground px-4 py-2 text-sm uppercase opacity-50">
                      {item}
                    </div>
                  ) : (
                    <ResultItem
                      action={item}
                      active={active}
                      currentRootActionId={rootActionId ?? ""}
                    />
                  )
                }
              />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </>
  );
};
