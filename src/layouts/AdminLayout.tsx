
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, // Remplacé DropdownMenuHeader par DropdownMenuLabel
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowRight,
  BarChart,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  ChevronRight,
  CreditCard,
  File,
  HelpCircle,
  Home,
  LayoutDashboard,
  ListChecks,
  Lock,
  LucideIcon,
  Mail,
  MessageSquare,
  Plus,
  Settings, // Utilisé Settings au lieu de Cog6Tooth
  ShoppingBag,
  SquarePen,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Props {
  children: React.ReactNode;
  title: string;
}

interface NavItem {
  title: string;
  href: string;
  icon: LucideIcon;
}

const sidebarNavItems: NavItem[] = [
  {
    title: "Tableau de bord",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Hôtels",
    href: "/admin/hotels",
    icon: Building2,
  },
  {
    title: "Chambres",
    href: "/admin/rooms",
    icon: Home,
  },
  {
    title: "Réservations",
    href: "/admin/bookings",
    icon: Calendar,
  },
  {
    title: "Rappels",
    href: "/admin/booking-reminders",
    icon: Mail,
  },
  {
    title: "Personnel",
    href: "/admin/staff",
    icon: Users,
  },
  {
    title: "Finances",
    href: "/admin/finances",
    icon: CreditCard,
  },
  {
    title: "Inventaire",
    href: "/admin/inventory",
    icon: ShoppingBag,
  },
  {
    title: "Maintenance",
    href: "/admin/maintenance",
    icon: ListChecks,
  },
  {
    title: "Rapports",
    href: "/admin/reports",
    icon: BarChart,
  },
  {
    title: "Paramètres",
    href: "/admin/settings",
    icon: Settings,
  },
];

const AdminLayout = ({ children, title }: Props) => {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-700">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4">
        <div className="mb-8">
          <Link to="/admin/dashboard" className="flex items-center space-x-2 font-semibold">
            <LayoutDashboard className="h-5 w-5" />
            <span>Ruzizi Backoffice</span>
          </Link>
        </div>
        <div className="space-y-2">
          {sidebarNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="flex items-center space-x-2 py-2 px-3 rounded-md hover:bg-gray-100"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">shadcn</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    shadcn@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Support</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Lock className="mr-2 h-4 w-4" />
                <span>Logout</span>
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
