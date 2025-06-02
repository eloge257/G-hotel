
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building,
  Bed,
  Calendar,
  Users,
  FileText,
  Settings,
  Briefcase,
  HardDrive,
  FileBarChart,
  LogOut,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface AdminSidebarProps {
  isCollapsed: boolean;
  toggleSidebar: () => void;
  userRole?: string;
  userHotel?: string;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ 
  isCollapsed, 
  toggleSidebar, 
  userRole = "admin",
  userHotel
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(() => {
    const savedUser = localStorage.getItem("ruzizi_user");
    return savedUser ? JSON.parse(savedUser) : { username: "Admin", role: "admin" };
  });

  const handleLogout = () => {
    localStorage.removeItem("ruzizi_user");
    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
    });
    navigate("/login");
  };

  // Définir les éléments de navigation en fonction du rôle
  const getNavItems = () => {
    // Items communs à tous les rôles
    const commonItems = [
      { name: "Tableau de bord", icon: LayoutDashboard, path: "/admin/dashboard" },
    ];
    
    // Items spécifiques par rôle
    if (userRole === "admin") {
      // L'administrateur a accès à tout
      return [
        ...commonItems,
        { name: "Établissements", icon: Building, path: "/admin/hotels" },
        { name: "Chambres", icon: Bed, path: "/admin/rooms" },
        { name: "Réservations", icon: Calendar, path: "/admin/bookings" },
        { name: "Personnel", icon: Users, path: "/admin/staff" },
        { name: "Finances", icon: FileText, path: "/admin/finances" },
        { name: "Stocks", icon: HardDrive, path: "/admin/inventory" },
        { name: "Maintenance", icon: Briefcase, path: "/admin/maintenance" },
        { name: "Rapports", icon: FileBarChart, path: "/admin/reports" },
        { name: "Paramètres", icon: Settings, path: "/admin/settings" },
      ];
    } else if (userRole === "manager") {
      // Le gérant d'hôtel a accès à la plupart des fonctionnalités mais pas toutes
      return [
        ...commonItems,
        { name: "Chambres", icon: Bed, path: "/admin/rooms" },
        { name: "Réservations", icon: Calendar, path: "/admin/bookings" },
        { name: "Personnel", icon: Users, path: "/admin/staff" },
        { name: "Finances", icon: FileText, path: "/admin/finances" },
        { name: "Stocks", icon: HardDrive, path: "/admin/inventory" },
        { name: "Maintenance", icon: Briefcase, path: "/admin/maintenance" },
        { name: "Rapports", icon: FileBarChart, path: "/admin/reports" },
      ];
    } else if (userRole === "receptionist") {
      // Le réceptionniste a un accès limité
      return [
        ...commonItems,
        { name: "Chambres", icon: Bed, path: "/admin/rooms" },
        { name: "Réservations", icon: Calendar, path: "/admin/bookings" },
      ];
    } else {
      // Staff de base avec accès minimal
      return [
        ...commonItems,
        { name: "Maintenance", icon: Briefcase, path: "/admin/maintenance" },
      ];
    }
  };

  const navItems = getNavItems();

  return (
    <>
      <div className={cn(
        "fixed top-0 left-0 h-screen bg-white border-r transition-all duration-300 z-20",
        isCollapsed ? "w-[70px]" : "w-[260px]"
      )}>
        <div className="flex items-center justify-between h-16 border-b px-4">
          {!isCollapsed && (
            <Link to="/admin/dashboard" className="flex items-center">
              <span className="text-ruzizi-blue font-display text-xl font-bold">Ruzizi</span>
              <span className="text-ruzizi-gold font-display text-xl font-bold ml-1">Admin</span>
            </Link>
          )}
          <Button variant="ghost" size="sm" onClick={toggleSidebar} className="ml-auto">
            {isCollapsed ? <ChevronRight size={20} /> : <X size={20} />}
          </Button>
        </div>

        <div className="p-3">
          {!isCollapsed && (
            <div className="py-4">
              <p className="text-sm font-medium">Connecté en tant que</p>
              <h3 className="font-bold">{userInfo.username}</h3>
              <p className="text-xs text-muted-foreground capitalize">
                {userRole === "admin" ? "Administrateur" :
                 userRole === "manager" ? "Gérant" :
                 userRole === "receptionist" ? "Réceptionniste" : "Personnel"}
                {userHotel && ` - ${userHotel}`}
              </p>
            </div>
          )}

          <div className="space-y-1">
            {navItems.map((item) => (
              <Link to={item.path} key={item.name}>
                <Button 
                  variant={location.pathname === item.path ? "secondary" : "ghost"} 
                  className={cn(
                    "w-full justify-start", 
                    isCollapsed && "justify-center px-0"
                  )}
                >
                  <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
                  {!isCollapsed && <span>{item.name}</span>}
                </Button>
              </Link>
            ))}
          </div>

          <Separator className="my-4" />
          
          <Button 
            variant="ghost" 
            onClick={handleLogout} 
            className={cn(
              "w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50", 
              isCollapsed && "justify-center px-0"
            )}
          >
            <LogOut className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
            {!isCollapsed && <span>Déconnexion</span>}
          </Button>
        </div>
      </div>
      
      {/* Mobile toggle */}
      <div className="fixed bottom-4 left-4 z-30 md:hidden">
        <Button 
          onClick={toggleSidebar} 
          size="icon" 
          variant="outline"
          className="rounded-full shadow-lg"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </>
  );
};

export default AdminSidebar;
