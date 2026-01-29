import { Instagram, Mail, MapPin, Settings } from "lucide-react";
import { Link } from "wouter";
import { type ContentData } from "@shared/schema";

export function Footer({ content }: { content: ContentData["contact"] }) {
  return (
    <footer className="bg-secondary/30 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        <div className="space-y-4">
          <img 
            src="/assets/logo-complete.png" 
            alt="Inhara Yoga" 
            className="h-12 w-auto"
          />
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
            Un espacio sagrado para reconectar con tu esencia a través del movimiento y la respiración.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-display text-lg font-semibold">Contacto</h4>
          <div className="space-y-3">
            <a href={content.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="w-4 h-4" />
              {content.instagram}
            </a>
            <a href={`mailto:${content.email}`} className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Mail className="w-4 h-4" />
              {content.email}
            </a>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {content.location}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-display text-lg font-semibold">Horario</h4>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Lunes - Viernes: 07:00 - 21:00</p>
            <p>Sábado: 09:00 - 14:00</p>
            <p>Domingo: Cerrado</p>
          </div>
        </div>
      </div>

      <div className="border-t border-border pt-8 flex items-center justify-center gap-4">
        <p className="text-xs text-muted-foreground/60">{content.copyright}</p>
        <Link href="/admin" className="text-muted-foreground/40 hover:text-primary transition-colors" data-testid="link-admin">
          <Settings className="w-4 h-4" />
        </Link>
      </div>
    </footer>
  );
}
