"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { DrawingPinIcon } from "@radix-ui/react-icons";
import Skeleton from '@/app/components/Skeleton'

const Navbar = () => {
  return (
    <nav className="border-b px-5 border-gray-200 py-3  ">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap="4">
            <Link href="/">
              <DrawingPinIcon />
            </Link>
            <NavbarLink />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};



const NavbarLink = () => {
  const currentPath = usePathname();

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
    <ul className="flex space-x-4">
      {links.map((link) => {
        return (
          <li
            className={classnames("cursor-pointer", {
             "nav-link": true,
             "!text-zinc-900": currentPath === link.href,
            
            })}
            key={link.href}
          >
            <Link href={link.href}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width={"3rem"} />;
 
  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user?.image as string | undefined}
              fallback="U"
              size="2"
              radius="full"
              className="cursor-pointer"
              referrerPolicy="no-referrer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user?.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {status === "unauthenticated" && (
        <Link className="nav-link" href="/api/auth/signin">Login</Link>
      )} 
    </Box>
  );
};

export default Navbar;
