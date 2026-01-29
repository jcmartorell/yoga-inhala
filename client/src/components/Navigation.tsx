import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#services", label: "Clases" },
    { href: "#reservation", label: "Reserva" },
    { href: "#online", label: "Online" },
    { href: "#about", label: "Nosotros" },
    { href: "#contact", label: "Contacto" },
  ];

  if (location.startsWith("/admin")) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full px-6 md:px-12 py-4",
        scrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-3" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center group">
          <img 
            src="/assets/logo-complete.png" 
            alt="Inhara Yoga" 
            className="h-10 md:h-12 w-auto transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Button 
            className="rounded-full px-6 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            onClick={() => document.getElementById("reservation")?.scrollIntoView({ behavior: 'smooth' })}
          >
            Reservar
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background border-b border-border shadow-lg p-6 flex flex-col gap-4 animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-lg font-medium text-foreground py-2 border-b border-border/50"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Button 
            className="w-full mt-4" 
            onClick={() => {
              setIsOpen(false);
              document.getElementById("reservation")?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Reservar Clase
          </Button>
        </div>
      )}
    </header>
  );
}
