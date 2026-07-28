"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  User,
  ChartColumn,
  Settings,
  Moon,
  ChevronDown,
} from "lucide-react";

import ThemeToggle from "@/components/common/ThemeToggle";
import LogoutButton from "@/components/common/LogoutButton";
import Divider from "@/components/common/Divider";

interface ProfileMenuProps {
  username: string;
}

export default function ProfileMenu({
  username,
}: ProfileMenuProps) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const initials = useMemo(() => {
    return username
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [username]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-xl px-2 py-1 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
          {initials}
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">

          <div className="flex items-center gap-4 p-5">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              {initials}
            </div>

            <div>
              <h2 className="font-semibold text-slate-900 dark:text-white">
                {username}
              </h2>

              <p className="text-sm text-slate-500">
                Welcome back 👋
              </p>
            </div>

          </div>

          <Divider text="" />

          <MenuItem
            icon={<User size={18} />}
            title="Profile"
          />

          <MenuItem
            icon={<ChartColumn size={18} />}
            title="Progress"
          />

          <MenuItem
            icon={<Settings size={18} />}
            title="Settings"
          />

          <Divider text="" />

          <div className="flex items-center justify-between px-5 py-3">

            <div className="flex items-center gap-3 text-slate-700 dark:text-slate-300">
              <Moon size={18} />
              <span>Theme</span>
            </div>

            <ThemeToggle />

          </div>

          <Divider text="" />

          <div className="p-3">
            <LogoutButton />
          </div>

        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <button className="flex w-full items-center gap-3 px-5 py-3 text-left text-slate-700 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
      {icon}

      <span>{title}</span>
    </button>
  );
}