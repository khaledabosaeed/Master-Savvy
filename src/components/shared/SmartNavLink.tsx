'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSmoothScrollTo } from '@/hooks/useSmoothScrollTo';

interface SmartNavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}



/**
 * Smart Navigation Link Component
 *
 * Automatically detects:
 * - Internal section links (starts with #) -> Smooth scroll
 * - Same page different section -> Smooth scroll
 * - Different page -> Normal navigation
 */
export default function SmartNavLink({ href, children, className = '', onClick }: SmartNavLinkProps) {
  const pathname = usePathname();
  const scrollToSection = useSmoothScrollTo();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Check if it's an internal link (starts with #)
    if (href.startsWith('#')) {
      e.preventDefault();
      const sectionId = href.replace('#', '');
      scrollToSection(sectionId, { offset: -80, duration: 1.5 });
      onClick?.();
      return;
    }

    // Check if it's a link to a section on the same page
    const urlParts = href.split('#');
    const targetPath = urlParts[0];
    const targetSection = urlParts[1];

    // If there's a section and we're on the same page
    if (targetSection && pathname === targetPath) {
      e.preventDefault();
      scrollToSection(targetSection, { offset: -80, duration: 1.5 });
      onClick?.();
      return;
    }

    // For different pages, let Next.js handle navigation normally
    onClick?.();
  };

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}
