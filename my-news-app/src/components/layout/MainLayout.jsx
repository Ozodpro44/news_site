import { ReactNode } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";
import { MobileHeader } from "./MobileHeader";

export const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <DesktopNav />
      <MobileHeader />
      <main className="pb-20 md:pb-8">
        {children}
      </main>
      <MobileNav />
    </div>
  );
};
