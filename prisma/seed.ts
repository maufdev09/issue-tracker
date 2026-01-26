import prisma from "@/prisma/client";
import { Status } from "@/app/generated/prisma/client";

const TITLES = [
  "Login page error",
  "Signup validation issue",
  "Dashboard slow",
  "Profile update fails",
  "Password reset broken",
  "Navbar responsive bug",
  "Role access bug",
  "Token expiration issue",
  "404 page missing",
  "Submit button disabled",
];

const DESCRIPTIONS = [
  "This issue occurs intermittently on production.",
  "Steps to reproduce are unclear.",
  "Happens after recent deployment.",
  "Works locally but fails in production.",
  "Only affects some users.",
];

const randomFrom = <T,>(arr: T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const randomDate = (daysBack = 30) => {
  const now = new Date();
  const past = new Date();
  past.setDate(now.getDate() - daysBack);
  return new Date(
    past.getTime() + Math.random() * (now.getTime() - past.getTime())
  );
};

async function main() {
  const issues = Array.from({ length: 10 }).map(() => {
    const createdAt = randomDate(30);
    return {
      title: randomFrom(TITLES),
      description: randomFrom(DESCRIPTIONS),
      status: randomFrom([
        Status.OPEN,
        Status.IN_PROGRESS,
        Status.CLOSED,
      ]),
      createdAt,
      updatedAt: createdAt,
    };
  });

  await prisma.issue.createMany({ data: issues });

  console.log("✅ Issues seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
