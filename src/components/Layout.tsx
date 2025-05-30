import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Instagram, Twitter, Youtube, Sun, Moon, Mail, Phone, Menu, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import ContactCard from "./ContactCard";
import MouseFollower from "./MouseFollower";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Projects", href: "/projects" },
  { name: "Research", href: "/research" },
  { name: "Blog", href: "/blog" },
];

const socialLinks = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/lorenjphillips/", icon: Linkedin },
  { name: "GitHub", href: "https://github.com/lorenjphillips", icon: Github },
  { name: "Instagram", href: "https://www.instagram.com/loren.phillips", icon: Instagram },
  { name: "Twitter", href: "https://x.com/lorenforeal", icon: Twitter },
  { name: "YouTube", href: "https://www.youtube.com/@lorenforeal", icon: Youtube },
  { name: "Email", href: "#", icon: Mail, isContact: true },
  { name: "Phone", href: "#", icon: Phone, isContact: true },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileContactOpen, setIsMobileContactOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDarkMode(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    document.documentElement.classList.toggle('dark', newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-background">
      <MouseFollower />
      {/* Header */}
      <header className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo/Brand */}
            {/* <Link to="/" className="text-xl font-semibold text-foreground hover:text-foreground/80 transition-colors">
              Connect:
            </Link> */}

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-between flex-1">
              {/* Social Media Icons */}
              <div className="flex items-center space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    onClick={(e) => {
                      if (social.isContact) {
                        e.preventDefault();
                        setIsContactOpen(true);
                      }
                    }}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 hover:scale-110 transform"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* Navigation Links */}
              <div className="flex items-center space-x-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                      "hover:bg-accent hover:text-accent-foreground",
                      location.pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Theme Toggle */}
                <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-border/40">
                  <Sun className="h-4 w-4" />
                  <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                  <Moon className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="flex md:hidden items-center justify-between w-full">
              {/* Contact Button */}
              <button
                onClick={() => setIsMobileContactOpen(!isMobileContactOpen)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Contact"
              >
                <Phone className="h-5 w-5" />
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Menu"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border/40">
              <div className="container mx-auto px-6 py-4">
                <div className="flex flex-col space-y-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-md transition-all duration-200",
                        "hover:bg-accent hover:text-accent-foreground",
                        location.pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex items-center justify-between px-4 py-2">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <div className="flex items-center space-x-2">
                      <Sun className="h-4 w-4" />
                      <Switch checked={isDarkMode} onCheckedChange={toggleTheme} />
                      <Moon className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Contact Dropdown */}
          {isMobileContactOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border/40">
              <div className="container mx-auto px-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      onClick={(e) => {
                        if (social.isContact) {
                          e.preventDefault();
                          setIsContactOpen(true);
                          setIsMobileContactOpen(false);
                        }
                      }}
                      className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <social.icon className="h-5 w-5" />
                      <span className="text-sm">{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="animate-fade-in">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center text-muted-foreground text-sm">
            <p>&copy; {new Date().getFullYear()} Loren Phillips. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Contact Card */}
      <ContactCard isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </div>
  );
}
