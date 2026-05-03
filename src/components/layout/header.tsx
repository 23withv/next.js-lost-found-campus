import { auth } from "@/auth";
import { HeaderClient } from "./header-client";

type HeaderVariant = "public" | "auth" | "pelapor" | "home";

interface HeaderProps {
  variant?: HeaderVariant;
  className?: string;
  showBackButton?: boolean;
  backHref?: string;
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: "ADMIN" | "PELAPOR" | string;
  } | null;
}

export async function Header({
  variant = "public",
  className,
  showBackButton = true,
  backHref = "/",
  user: passedUser,
}: HeaderProps) {
  const session = passedUser ? null : await auth();
  const currentUser = passedUser || session?.user;

  return (
    <HeaderClient
      variant={variant}
      className={className}
      showBackButton={showBackButton}
      backHref={backHref}
      user={currentUser}
    />
  );
}