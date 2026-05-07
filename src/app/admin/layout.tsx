'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Wifi,
  Star,
  HelpCircle,
  FileText,
  Shield,
  Award,
  MessageSquare,
  Bell,
  Search,
  Code,
  Settings,
  Menu,
  LogOut,
  ChevronLeft,
  WifiIcon,
  Globe,
  LayoutTemplate,
  UserCog,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/providers', label: 'Providers', icon: Wifi },
  { href: '/admin/testimonials', label: 'Testimonials', icon: Star },
  { href: '/admin/faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/articles', label: 'Articles', icon: FileText },
  { href: '/admin/trust-indicators', label: 'Trust Indicators', icon: Shield },
  { href: '/admin/keunggulan', label: 'Keunggulan', icon: Award },
  { href: '/admin/popups', label: 'Popups', icon: MessageSquare },
  { href: '/admin/notifications', label: 'Notifications', icon: Bell },
  { href: '/admin/seo', label: 'SEO Settings', icon: Search },
  { href: '/admin/tracking', label: 'Tracking', icon: Code },
  { href: '/admin/promo-settings', label: 'LP Settings', icon: LayoutTemplate },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
  { href: '/admin/users', label: 'Users', icon: UserCog },
];

function SidebarContent({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-blue-900 text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-blue-800">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
          <WifiIcon className="h-6 w-6 text-blue-200" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold leading-tight">WIFI MURAH</span>
          <span className="text-xs text-blue-300 leading-tight">BANDUNG</span>
        </div>
      </div>

      {/* View LP Promo Button */}
      <div className="px-3 pt-3">
        <a
          href="/promo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 rounded-lg bg-orange-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-orange-700 transition-colors"
        >
          <LayoutTemplate className="h-4 w-4 shrink-0" />
          Lihat LP Promo
        </a>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 min-h-0 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-white/15 text-white shadow-sm'
                    : 'text-blue-200 hover:bg-white/10 hover:text-white'
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-blue-800 p-3 space-y-1">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-blue-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <Globe className="h-4 w-4" />
          Lihat Website
        </a>
        <Link
          href="/admin/login"
          onClick={() => {
            if (onNavigate) onNavigate()
          }}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-blue-300 hover:bg-white/10 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Logout
        </Link>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setAuthLoading(false);
      return;
    }

    try {
      const stored = localStorage.getItem('admin_user');
      if (stored) {
        const user = JSON.parse(stored) as AdminUser;
        setAdminUser(user);
      } else {
        router.replace('/admin/login');
      }
    } catch {
      router.replace('/admin/login');
    } finally {
      setAuthLoading(false);
    }
  }, [isLoginPage, router]);

  const handleLogout = () => {
    localStorage.removeItem('admin_user');
    setAdminUser(null);
    router.replace('/admin/login');
  };

  // Login page renders without sidebar/auth
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Loading state while checking auth
  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          <p className="text-sm text-muted-foreground">Memuat...</p>
        </div>
      </div>
    );
  }

  // Not authenticated — show redirect message briefly
  if (!adminUser) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          <p className="text-sm text-muted-foreground">Mengalihkan ke halaman login...</p>
        </div>
      </div>
    );
  }

  const userInitial = adminUser.name ? adminUser.name.charAt(0).toUpperCase() : 'A';

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-[260px] lg:shrink-0 lg:flex-col border-r border-blue-800">
        <SidebarContent pathname={pathname} />
      </aside>

      {/* Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header */}
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 lg:px-6 shadow-sm">
          {/* Mobile menu trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-[260px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <SidebarContent pathname={pathname} onNavigate={() => setMobileOpen(false)} />
            </SheetContent>
          </Sheet>

          <div className="flex-1">
            <h2 className="text-sm font-medium text-muted-foreground">
              Admin Panel
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white text-xs font-bold">
                {userInitial}
              </div>
              <span className="font-medium">{adminUser.name}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
