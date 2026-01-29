import { motion } from "framer-motion";
import { useContent } from "@/hooks/use-content";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Lock, Smartphone, Download, Check, Heart, Users } from "lucide-react";
import { cn } from "@/lib/utils";

// Helper for animations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } }
};

export default function Home() {
  const { data: content, isLoading } = useContent();

  if (isLoading || !content) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/20 animate-spin" />
          <p className="text-muted-foreground font-display tracking-widest text-sm">LOADING INHARA</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background selection:bg-primary/20">
      <Navigation />
      
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/90 z-10" />
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10" />
          <img 
            src="/assets/studio-altar.jpg" 
            alt="Yoga Studio" 
            className="w-full h-full object-cover object-center scale-105 animate-[zoom_20s_infinite_alternate]" 
          />
        </div>

        <div className="relative z-20 container mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6 md:space-y-8"
          >
            <motion.h1 variants={fadeInUp} className="font-display font-medium text-6xl md:text-8xl lg:text-9xl text-foreground tracking-tight leading-none">
              <span className="block text-primary/90">{content.hero.title1}</span>
              <span className="block">{content.hero.title2}</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-foreground/80 font-light max-w-xl mx-auto leading-relaxed">
              {content.hero.subtitle}
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105"
                onClick={() => document.getElementById("reservation")?.scrollIntoView({ behavior: 'smooth' })}
              >
                {content.hero.buttonReserve}
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg border-foreground/20 hover:bg-secondary/50 transition-all"
                onClick={() => document.getElementById("online")?.scrollIntoView({ behavior: 'smooth' })}
              >
                {content.hero.buttonOnline}
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 md:py-32 bg-background relative">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title={content.services.title} 
            subtitle={content.services.subtitle} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {content.services.items.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-6 shadow-md">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors z-10" />
                  {item.image && (
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <h3 className="text-2xl font-display font-medium mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION APP SECTION */}
      <section id="reservation" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 space-y-8">
              <SectionHeading 
                title={content.reservation.title} 
                subtitle={content.reservation.subtitle} 
                center={false}
                className="mb-8"
              />
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {content.reservation.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {content.reservation.features.map((feature, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <Button className="h-14 px-8 rounded-xl gap-3 bg-black text-white hover:bg-black/80">
                  <Smartphone className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold opacity-70">Download on</div>
                    <div className="text-sm font-bold leading-none">{content.reservation.buttonIos}</div>
                  </div>
                </Button>
                <Button className="h-14 px-8 rounded-xl gap-3 bg-black text-white hover:bg-black/80">
                  <Download className="w-5 h-5" />
                  <div className="text-left">
                    <div className="text-[10px] uppercase font-bold opacity-70">Get it on</div>
                    <div className="text-sm font-bold leading-none">{content.reservation.buttonAndroid}</div>
                  </div>
                </Button>
              </div>
            </div>
            
            <div className="flex-1 w-full max-w-md lg:max-w-none flex justify-center">
              <div className="relative w-72 h-[580px] bg-white rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-7 bg-gray-900 z-20 flex justify-center">
                  <div className="w-24 h-5 bg-black rounded-b-xl" />
                </div>
                {/* Mock App UI */}
                <div className="w-full h-full pt-10 px-4 bg-background">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-8 h-8 rounded-full bg-secondary" />
                    <div className="font-display font-bold text-primary">INHARA</div>
                    <div className="w-6 h-6 rounded bg-secondary" />
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-primary/10 mb-6">
                      <h3 className="font-bold text-lg mb-1">Próxima Clase</h3>
                      <p className="text-sm text-primary">Vinyasa Flow • 18:00</p>
                    </div>
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="flex gap-3 items-center p-3 rounded-lg border border-border/50">
                        <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center font-display font-bold text-muted-foreground">
                          {10 + n}
                        </div>
                        <div>
                          <div className="font-medium text-sm">Hatha Yoga</div>
                          <div className="text-xs text-muted-foreground">09:00 - 10:15</div>
                        </div>
                        <Button size="sm" variant="ghost" className="ml-auto text-xs">Reservar</Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ONLINE STUDIO */}
      <section id="online" className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-6">
          <SectionHeading 
            title={content.online.title} 
            subtitle={content.online.subtitle}
            className="text-white"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.online.classPreviews.map((preview, i) => (
              <div key={i} className="group relative aspect-video bg-white/5 rounded-xl overflow-hidden border border-white/10 hover:border-primary/50 transition-colors cursor-pointer">
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-primary transition-colors">
                    {preview.isLocked ? <Lock className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white ml-1" />}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h4 className="font-bold text-white mb-1">{preview.title}</h4>
                  <div className="flex gap-3 text-xs text-white/60">
                    <span>{preview.duration}</span>
                    <span>•</span>
                    <span>{preview.level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white/5 rounded-2xl p-8 md:p-12 border border-white/10 flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-4">
              <h3 className="font-display text-3xl font-medium">{content.online.patreonTitle}</h3>
              <p className="text-white/70 leading-relaxed">{content.online.patreonDescription}</p>
              <ul className="space-y-2">
                {content.online.patreonFeatures.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                    <Check className="w-4 h-4 text-primary" /> {feat}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center gap-4 min-w-[200px]">
              <div className="text-2xl font-bold text-primary">{content.online.patreonPrice}</div>
              <Button size="lg" className="w-full bg-primary hover:bg-primary/90 text-white rounded-full">
                {content.online.patreonButton}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img 
                  src={content.about.image || "/assets/yoga_meditation_peac_79cb9c1b.jpg"} 
                  alt="About Inhara" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Heart className="w-6 h-6" fill="currentColor" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold font-display">{content.about.communityCount}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wider">{content.about.communityLabel}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2 space-y-8">
              <SectionHeading 
                title={content.about.title} 
                subtitle="Nuestra Esencia"
                center={false}
              />
              
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                {content.about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                {content.about.values.map((value, i) => (
                  <div key={i} className="border-l-2 border-primary pl-4">
                    <h4 className="font-display font-bold text-lg mb-2">{value.title}</h4>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT BANNER */}
      <section id="contact" className="py-20 bg-primary/10">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-display text-4xl mb-6">¿Tienes alguna duda?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Estamos aquí para ayudarte en tu camino. Escríbenos o visítanos en el estudio.
          </p>
          <a href={`mailto:${content.contact.email}`}>
            <Button size="lg" className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90">
              Contáctanos <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </a>
        </div>
      </section>

      <Footer content={content.contact} />
    </div>
  );
}
