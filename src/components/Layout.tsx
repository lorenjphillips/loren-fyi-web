import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Instagram, Twitter, Youtube, Sun, Moon, Mail, Phone } from "lucide-react";
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
            {/* Logo/Brand and Social Links */}
            <div className="flex items-center space-x-6">
              <Link to="/" className="text-xl font-semibold text-foreground hover:text-foreground/80 transition-colors">
                Connect:
              </Link>
              
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
            </div>

            {/* Navigation */}
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
          </nav>
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
