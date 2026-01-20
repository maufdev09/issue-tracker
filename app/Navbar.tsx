"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const Navbar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  const links = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "issue",
      href: "/issue",
    },
    {
      label: "Dashboard",
      href: "/Dashboard",
    },
  ];

  return (
    <nav className="flex space-x-20 border-b px-5 border-gray-200 h-14 items-center">
      <Link href="/"></Link>
      <ul className="flex space-x-4">
        {links.map((link) => {
          return (
            <li
              className={classnames("cursor-pointer", {
                "font-bold": currentPath === link.href,
                "font-normal": currentPath !== link.href,
                "hover:font-bold transition-colors": true,
              })}
              key={link.href}
            >
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
      <Box>

        {status === "authenticated" && (
          <>
            <span>Welcome, {session.user?.name}</span>
            <Link href="/api/auth/signout">Sign Out</Link>
          </>
        )}{ status === "unauthenticated" && (
          <Link href="/api/auth/signin">Sign In</Link>
        )}
      </Box>
    </nav>
  );
};

export default Navbar;
