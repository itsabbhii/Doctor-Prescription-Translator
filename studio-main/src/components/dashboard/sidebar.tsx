'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  Beaker,
  ShieldCheck,
  LayoutDashboard,
  LogOut,
  BookMarked,
  History,
  LineChart,
  CalendarClock,
  CalendarPlus,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/use-auth';
import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

const patientLinks = [
  { href: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/patient/book-appointment', label: 'Book Appointment', icon: CalendarPlus },
];

const pharmacistLinks = [
  { href: '/pharmacist/dashboard', label: 'Catalog', icon: BookMarked },
  { href: '/pharmacist/appointments', label: 'Appointments', icon: CalendarClock },
];

const adminLinks = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LineChart },
];


export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  }

  const roleLinks = {
    Patient: patientLinks,
    Pharmacist: pharmacistLinks,
    Admin: adminLinks,
  };

  const links = user ? roleLinks[user.role] : [];
  
  const roleIcons = {
    Patient: <Users className="h-5 w-5" />,
    Pharmacist: <Beaker className="h-5 w-5" />,
    Admin: <ShieldCheck className="h-5 w-5" />,
  }

  if (!user) return null;

  return (
    <aside className="no-print hidden w-64 flex-col border-r bg-card p-4 shadow-inner md:flex">
      <div className="mb-8 flex justify-center">
        <Logo />
      </div>

      <div className="mb-6 flex items-center gap-3 rounded-lg bg-secondary p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            {roleIcons[user.role]}
        </div>
        <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.role}</p>
        </div>
      </div>
      
      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-card-foreground/80 transition-all hover:bg-accent hover:text-accent-foreground',
              {
                'bg-primary/10 text-primary font-semibold': pathname === link.href,
              }
            )}
          >
            <link.icon className="h-5 w-5" />
            <span>{link.label}</span>
          </Link>
        ))}
      </nav>

      <div>
        <Button variant="ghost" className="w-full justify-start gap-3" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
        </Button>
      </div>
    </aside>
  );
}

// Needed for client component with router
import { useRouter } from 'next/navigation';
