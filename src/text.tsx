"use client";

import { Home, Settings, User, HelpCircle, Lock, Users, CloudMoon, FileText, BellRing, MessageSquare } from "lucide-react";
import { GlowingEffect } from "../src/components/ui/glowing-effect";
import { useEffect } from "react";

export default function GlowingEffectDemo() {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  // Navigation items with icons and labels
  const navItems = [
    { icon: <Home className="h-4 w-4 text-black dark:text-neutral-400" />, label: "Home" },
    { icon: <User className="h-4 w-4 text-black dark:text-neutral-400" />, label: "Farmer's Portal" },
    { icon: <Users className="h-4 w-4 text-black dark:text-neutral-400" />, label: "Community" },
    { icon: <CloudMoon className="h-4 w-4 text-black dark:text-neutral-400" />, label: "Weather" },
    { icon: <FileText className="h-4 w-4 text-black dark:text-neutral-400" />, label: "Report" },
    { icon: <BellRing className="h-4 w-4 text-black dark:text-neutral-400" />, label: "Alerts" },
    { icon: <Settings className="h-4 w-4 text-black dark:text-neutral-400" />, label: "Settings" },
    { icon: <MessageSquare className="h-4 w-4 text-black dark:text-neutral-400" />, label: "Feedback" },
    { icon: <HelpCircle className="h-4 w-4 text-black dark:text-neutral-400" />, label: "Help" },
  ];

  return (
    <div className="flex justify-start w-full">
      <GridItem navItems={navItems} />
    </div>
  );
}

interface GridItemProps {
  navItems?: { icon: React.ReactNode; label: string }[];
}

const GridItem = ({ navItems = [] }: GridItemProps) => {
  return (
    <div className="w-80 h-auto list-none">
      <div className="relative h-full rounded-2.5xl border p-2 md:rounded-3xl md:p-3">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-0.75 p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            {/* Navigation Links */}
            {navItems.length > 0 && (
              <div className="mt-6 space-y-3">
                {navItems.map((item, index) => (
                  <NavLink key={index} icon={item.icon} label={item.label} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface NavLinkProps {
  icon: React.ReactNode;
  label: string;
}

const NavLink = ({ icon, label }: NavLinkProps) => {
  return (
    <a href="#" className="block w-full">
      <div className="relative rounded-xl border border-gray-100 dark:border-gray-800 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg border border-gray-100 dark:border-gray-700 p-2 bg-white dark:bg-gray-900">
            {icon}
          </div>
          <span className="font-medium text-sm text-black dark:text-white">{label}</span>
        </div>
      </div>
    </a>
  );
};
