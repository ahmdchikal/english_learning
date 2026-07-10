import * as React from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

type LinkButtonProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

/**
 * Base UI's Button uses a `render` prop instead of Radix's `asChild` for
 * polymorphic rendering. This wrapper keeps call sites readable:
 * `<LinkButton href="/register">Daftar</LinkButton>` instead of repeating
 * the `render={<Link .../>}` pattern everywhere.
 */
export function LinkButton({ href, variant, size, className, children, ...linkProps }: LinkButtonProps) {
  return (
    <Button variant={variant} size={size} className={className} render={<Link href={href} {...linkProps} />}>
      {children}
    </Button>
  );
}
