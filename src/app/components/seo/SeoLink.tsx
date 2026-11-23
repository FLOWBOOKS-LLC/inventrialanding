import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { pathForPage, type PageKey } from "@/app/lib/seo";

interface SeoLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  page: PageKey;
  onNavigate?: (page: string) => void;
  children: ReactNode;
}

/**
 * Internal link that renders a real `href` (so crawlers can follow it) while
 * still using client-side navigation when JavaScript is available.
 */
export function SeoLink({ page, onNavigate, onClick, children, ...rest }: SeoLinkProps) {
  const href = pathForPage(page);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented || !onNavigate) return;
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(page);
  };

  return (
    <a href={href} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
}
