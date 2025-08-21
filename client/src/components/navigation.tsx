import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Calendar, Menu, X, ChevronDown, Plus, User } from "lucide-react";

export default function Navigation() {
  const { user } = useAuth();
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/events", label: "Browse Events", icon: Calendar },
    { href: "/create-event", label: "Create Event", icon: Plus, highlight: true },
    { href: "/dashboard", label: "Dashboard", icon: User },
  ];

  const isActiveLink = (href: string) => location === href;

  const getUserInitials = (user: any) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName[0]}${user.lastName[0]}`;
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  const getUserDisplayName = (user: any) => {
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.email) {
      return user.email;
    }
    return "User";
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center" data-testid="link-home">
              <Calendar className="text-primary text-2xl mr-2" />
              <span className="font-bold text-xl text-slate-800">EventHub</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-2">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link key={item.href} href={item.href}>
                      <Button
                        variant={item.highlight ? "default" : "ghost"}
                        className={`px-4 py-2 text-sm font-medium flex items-center gap-2 ${
                          item.highlight 
                            ? "bg-primary text-white hover:bg-blue-600 shadow-lg"
                            : isActiveLink(item.href)
                              ? "text-primary bg-primary/10"
                              : "text-slate-700 hover:text-primary"
                        }`}
                        data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <IconComponent className="h-4 w-4" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2" data-testid="button-user-menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profileImageUrl || ""} alt="Profile" />
                    <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                  </Avatar>
                  <span className="text-slate-700 font-medium">{getUserDisplayName(user)}</span>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" data-testid="link-profile">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" data-testid="link-settings">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a href="/api/logout" data-testid="link-logout">
                    Logout
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      isActiveLink(item.href)
                        ? "text-primary bg-primary/10"
                        : "text-slate-700 hover:text-primary"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <div className="border-t border-slate-200 pt-4 pb-3">
                <div className="flex items-center px-2">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.profileImageUrl || ""} alt="Profile" />
                    <AvatarFallback>{getUserInitials(user)}</AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <div className="text-base font-medium text-slate-800">
                      {getUserDisplayName(user)}
                    </div>
                    <div className="text-sm text-slate-500">{user?.email || ""}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <a href="/api/logout" data-testid="mobile-link-logout">
                      Logout
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
