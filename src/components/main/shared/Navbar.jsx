import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuthStatus, useSignout } from "@/hooks/auth.hook";
import {
  Bell,
  ChevronDown,
  Home,
  User,
  LogOut,
  ShoppingCart,
  Menu,
  X,
  Mail,
  Gift,
  Car,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { useCart } from "@/contexts/cart-context";
// import { ThemeToggle } from "@/components/theme-toggle"; // Theme toggle removed - Light mode only

const Navbar = () => {
  const location = useLocation();
  // Use actual authentication status
  const { isAuthenticated, user } = useAuthStatus();
  // Fallback to localStorage if hook user is unavailable
  let localUser = null;
  try {
    const raw = localStorage.getItem('user') || localStorage.getItem('auth');
    if (raw) {
      const parsed = JSON.parse(raw);
      localUser = parsed?.user ? parsed.user : parsed;
    }
  } catch { }
  const currentUser = user || localUser || {};
  const { mutate: logout, isPending: isLoggingOut } = useSignout();
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [mobileNotificationOpen, setMobileNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      icon: Mail,
      iconBg: "bg-blue-500",
      message: "John Doe sent you a new message.",
      time: "5 mins ago",
      isRead: false,
    },
    {
      id: 2,
      icon: Gift,
      iconBg: "bg-green-500",
      message: "You earned 100 points for sharing your last post.",
      time: "1 hour ago",
      isRead: true,
    },
    {
      id: 3,
      icon: Car,
      iconBg: "bg-purple-500",
      message: "Your friend Mike purchased a car! You earned 500 pts.",
      time: "Yesterday",
      isRead: false,
    },
  ]);
  const { itemCount } = useCart();

  const links = [
    { to: "/", label: "Home" },
    { to: "/aboutus", label: "About Us" },
    { to: "/courses", label: "Courses" },
    { to: "/testimonial", label: "Testimonials" },
    { to: "/contactus", label: "Contact" },
  ];

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const handleNotificationClose = () => {
    markAllAsRead();
    setNotificationOpen(false);
  };

  const handleMobileNotificationClose = () => {
    markAllAsRead();
    setMobileNotificationOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/src/assets/logo.png"
              alt="Logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`transition-colors ${isActive
                    ? "text-gray-900 font-semibold"
                    : "text-gray-700 hover:text-gray-900 font-medium hover:font-semibold"
                    }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Theme Toggle */}
                {/* <ThemeToggle /> */}

                {/* Cart Icon - Hidden */}
                {/* <Link
                  to="/cart"
                  className="relative p-2 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link> */}

                {/* Notification Dropdown */}
                <DropdownMenu
                  open={notificationOpen}
                  onOpenChange={setNotificationOpen}
                >
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative bg-gray-300 rounded-full hover:bg-gray-300">
                      <Bell className="w-5 h-5 text-[#071431]" />
                      {/* {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {unreadCount}
                        </span>
                      )} */}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80 p-0" align="end">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h3 className="font-semibold text-foreground">
                        Notifications
                      </h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={handleNotificationClose}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>

                    {notifications.length > 0 ? (
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? "bg-blue-50" : ""
                              }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div
                              className={`p-2 rounded-full ${notification.iconBg}`}
                            >
                              <notification.icon className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground leading-relaxed">
                                {notification.message}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                            )}
                          </div>
                        ))}

                        <div className="p-4 border-t">
                          <button
                            onClick={markAllAsRead}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                          >
                            Mark all as read
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="p-8 text-center">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                          <Bell className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">
                          No Notifications
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          No new notifications.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          You're all caught up!
                        </p>
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center space-x-2 rounded-lg bg-transparent hover:bg-transparent"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-4 h-4 text-[#071431]" />
                      </div>
                      <span className="text-sm font-medium text-[#071431]">
                        {currentUser?.name || 'User'}
                      </span>
                      <ChevronDown className="w-4 h-4 text-[#071431]" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white  text-[#071431]" align="end">
                    <DropdownMenuLabel>
                      <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-5 h-5 text-[#071431]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-[#071431]">
                            {currentUser?.name || 'User'}
                          </p>
                          <p className="text-xs text-[#071431]">
                            {currentUser?.email || ''}
                          </p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/dashboard" className="flex items-center gap-2">
                        <Home className="w-4 h-4 text-[#071431]" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/myaccount" className="flex items-center gap-2 ">
                        <User className="w-4 h-4 text-[#071431]" />
                        My Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="flex items-center gap-2 cursor-pointer"
                      onClick={() => logout()}
                      disabled={isLoggingOut}
                    >
                      <LogOut className="w-4 h-4 text-[#071431]" />
                      {isLoggingOut ? 'Signing out...' : 'Log out'}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/signin">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2 px-2">
            {/* Cart - Hidden */}
            {/* <Link
              to="/cart"
              className="relative p-2 text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link> */}

            {/* Notification for Mobile */}
            <DropdownMenu
              open={mobileNotificationOpen}
              onOpenChange={setMobileNotificationOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-[calc(100vw-2rem)] max-w-80 p-0"
                align="end"
              >
                <div className="flex items-center justify-between p-4 border-b">
                  <h3 className="font-semibold text-foreground">
                    Notifications
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleMobileNotificationClose}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {notifications.length > 0 ? (
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex items-start gap-3 p-4 hover:bg-gray-50 cursor-pointer ${!notification.isRead ? "bg-blue-50" : ""
                          }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        <div
                          className={`p-2 rounded-full ${notification.iconBg}`}
                        >
                          <notification.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-foreground leading-relaxed">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    ))}

                    <div className="p-4 border-t">
                      <button
                        onClick={markAllAsRead}
                        className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Mark all as read
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Bell className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      No Notifications
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      No new notifications.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      You're all caught up!
                    </p>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Sheet Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 sm:w-80">
                <div className="space-y-2 px-2">
                  {links.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                      <SheetClose asChild key={link.to}>
                        <Link
                          to={link.to}
                          className={`block px-3 py-2 text-base rounded-md ${isActive
                            ? "font-semibold text-foreground bg-accent"
                            : "font-medium text-foreground hover:bg-accent"
                            }`}
                        >
                          {link.label}
                        </Link>
                      </SheetClose>
                    );
                  })}

                  {isAuthenticated ? (
                    <div className="pt-4 border-t space-y-2">
                      <SheetClose asChild>
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-md"
                        >
                          <Home className="w-5 h-5" />
                          Dashboard
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link
                          to="/myaccount"
                          className="flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-md"
                        >
                          <User className="w-5 h-5" />
                          My Account
                        </Link>
                      </SheetClose>
                      <button
                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-accent rounded-md disabled:opacity-50"
                        onClick={() => logout()}
                        disabled={isLoggingOut}
                      >
                        <LogOut className="w-5 h-5" />
                        {isLoggingOut ? 'Signing out...' : 'Log out'}
                      </button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t space-y-2">
                      <SheetClose asChild>
                        <Link to="/login">
                          <Button variant="outline" className="w-full">
                            Login
                          </Button>
                        </Link>
                      </SheetClose>
                      <SheetClose asChild>
                        <Link to="/register">
                          <Button className="w-full">Sign Up</Button>
                        </Link>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
