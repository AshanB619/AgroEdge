"use client";

import { Home, Settings, User, HelpCircle, Lock, Users, CloudMoon, FileText, BellRing, MessageSquare } from "lucide-react";
import { GlowingEffect } from "./glowing-effect";
import { useEffect } from "react";

export default function GlowingEffectDemo() {
  useEffect(() => {
    // Remove the 'dark' class from the document if it exists
    document.documentElement.classList.remove('dark');
    // Alternative approach if using data-theme
    document.documentElement.setAttribute("data-theme", "light");
  }, []);

  // Navigation items with icons and labels
  const navItems = [
    { icon: <Home className="h-4 w-4 text-gray-700" />, label: "Home" },
    { icon: <User className="h-4 w-4 text-gray-700" />, label: "Farmer's Portal" },
    { icon: <Users className="h-4 w-4 text-gray-700" />, label: "Community" },
    { icon: <CloudMoon className="h-4 w-4 text-gray-700" />, label: "Weather" },
    { icon: <FileText className="h-4 w-4 text-gray-700" />, label: "Report" },
    { icon: <BellRing className="h-4 w-4 text-gray-700" />, label: "Alerts" },
    { icon: <Settings className="h-4 w-4 text-gray-700" />, label: "Settings" },
    { icon: <MessageSquare className="h-4 w-4 text-gray-700" />, label: "Feedback" },
    { icon: <HelpCircle className="h-4 w-4 text-gray-700" />, label: "Help" },
  ];

  return (
    <div className="flex justify-start ">
      <GridItem navItems={navItems} />
    </div>
  );
}

interface GridItemProps {
  navItems?: { icon: React.ReactNode; label: string }[];
}

const GridItem = ({ navItems = [] }: GridItemProps) => {
  return (
    <div className="w-80 h-auto list-none pt-8 px-6">
      <div className=" fixed h-auto w-72 rounded-2.5xl border border-gray-200 p-2 md:rounded-3xl md:p-3">
        <GlowingEffect spread={40} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-gray-100 p-6 shadow-sm md:p-6">
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
    <a href="#" className="block ">
      <div className="relative rounded-xl border border-gray-200 p-3 group hover:bg-green-400 transition-colors">
        <div className="flex items-center space-x-3">
          <div className="rounded-lg border border-gray-200 p-2 bg-white">
            {icon}
          </div>
          <span className="font-medium text-sm text-gray-900 group-hover:text-white">{label}</span>
        </div>
      </div>
    </a>
  );
};