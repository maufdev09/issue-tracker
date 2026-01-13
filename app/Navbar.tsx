"use client";

import  Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const Navbar = () => {

const currentPath=usePathname()

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
            <li className={classnames("cursor-pointer", {
              "font-bold": currentPath === link.href,
              "font-normal": currentPath !== link.href,
              "hover:font-bold transition-colors": true,
              
              
              })} key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
        
      </ul>
    </nav>
  );
};

export default Navbar;
