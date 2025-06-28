'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ClipboardList, FileVideo, History, Settings as SettingsIcon } from 'lucide-react';

import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

const links = [
  { href: '/', label: 'Practice', icon: ClipboardList },
  { href: '/exam', label: 'Exam Simulation', icon: FileVideo },
  { href: '/history', label: 'History', icon: History },
  { href: '/settings', label: 'Settings', icon: SettingsIcon },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <SidebarMenuItem key={link.href}>
            <Link href={link.href} className="w-full" legacyBehavior passHref>
              <SidebarMenuButton
                asChild
                isActive={isActive}
                tooltip={link.label}
              >
                <a>
                  <link.icon />
                  <span>{link.label}</span>
                </a>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
