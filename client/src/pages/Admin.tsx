import { useState, useEffect } from "react";
import { useAuthStore, useLogin, useLogout } from "@/hooks/use-auth";
import { useContent, useUpdateContent, defaultContent } from "@/hooks/use-content";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contentSchema, type ContentData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogOut, Save, Image as ImageIcon } from "lucide-react";

export default function Admin() {
  const { isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) return <LoginScreen />;
  return <Dashboard />;
}

function LoginScreen() {
  const [password, setPassword] = useState("");
  const { mutate: login, isPending } = useLogin();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(password, {
      onError: (err) => {
        toast({
          title: "Error de acceso",
          description: err.message,
          variant: "destructive",
        });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/30">
      <Card className="w-full max-w-md shadow-xl border-none">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="font-display text-2xl">Admin Inhara</CardTitle>
          <CardDescription>Introduce la contraseña para editar el contenido</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input 
              type="password" 
              placeholder="Contraseña..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 text-center text-lg tracking-widest"
            />
            <Button type="submit" className="w-full h-12 text-lg" disabled={isPending}>
              {isPending ? <Loader2 className="animate-spin" /> : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Icon component used above
function Lock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function Dashboard() {
  const { data: content, isLoading } = useContent();
  const { mutate: updateContent, isPending } = useUpdateContent();
  const { mutate: logout } = useLogout();
  const { token } = useAuthStore();
  const { toast } = useToast();

  const form = useForm<ContentData>({
    resolver: zodResolver(contentSchema),
    defaultValues: content || defaultContent,
  });

  // Reset form when content loads
  useEffect(() => {
    if (content) form.reset(content);
  }, [content, form]);

  const onSubmit = (data: ContentData) => {
    if (!token) return;
    updateContent({ content: data, token }, {
      onSuccess: () => {
        toast({ title: "Contenido actualizado", description: "Los cambios se han guardado correctamente." });
      },
      onError: (err) => {
        toast({ title: "Error", description: err.message, variant: "destructive" });
      }
    });
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin w-8 h-8 text-primary" /></div>;

  return (
    <div className="min-h-screen bg-secondary/10 pb-20">
      <header className="bg-white border-b border-border px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <h1 className="font-display font-bold text-xl">Panel de Administración</h1>
        <Button variant="ghost" size="sm" onClick={() => logout()} className="text-muted-foreground hover:text-destructive">
          <LogOut className="w-4 h-4 mr-2" /> Salir
        </Button>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-4xl">
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Editar Contenido</h2>
              <p className="text-muted-foreground">Modifica los textos e imágenes de la web.</p>
            </div>
            <Button type="submit" size="lg" disabled={isPending} className="gap-2">
              {isPending ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
              Guardar Cambios
            </Button>
          </div>

          <Tabs defaultValue="hero" className="w-full">
            <TabsList className="flex flex-wrap h-auto bg-white p-2 rounded-xl border border-border/50 gap-2 mb-8">
              <TabsTrigger value="hero">Inicio</TabsTrigger>
              <TabsTrigger value="services">Clases</TabsTrigger>
              <TabsTrigger value="reservation">App</TabsTrigger>
              <TabsTrigger value="online">Online</TabsTrigger>
              <TabsTrigger value="about">Nosotros</TabsTrigger>
              <TabsTrigger value="contact">Contacto</TabsTrigger>
            </TabsList>

            <TabsContent value="hero" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sección Hero</CardTitle>
                  <CardDescription>Lo primero que ven los usuarios.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Título Línea 1</Label>
                      <Input {...form.register("hero.title1")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Título Línea 2</Label>
                      <Input {...form.register("hero.title2")} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Subtítulo</Label>
                    <Textarea {...form.register("hero.subtitle")} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Botón Principal</Label>
                      <Input {...form.register("hero.buttonReserve")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Botón Secundario</Label>
                      <Input {...form.register("hero.buttonOnline")} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services" className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Clases</CardTitle></CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Título Sección</Label>
                    <Input {...form.register("services.title")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Subtítulo</Label>
                    <Input {...form.register("services.subtitle")} />
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <Label>Tipos de Yoga</Label>
                    {content?.services.items.map((_, index) => (
                      <div key={index} className="p-4 border rounded-lg bg-secondary/10 space-y-3">
                        <Input placeholder="Título" {...form.register(`services.items.${index}.title`)} />
                        <Textarea placeholder="Descripción" {...form.register(`services.items.${index}.description`)} />
                        <div className="flex gap-2">
                          <ImageIcon className="w-4 h-4 mt-3 text-muted-foreground" />
                          <Input placeholder="URL de imagen (/assets/...)" {...form.register(`services.items.${index}.image`)} />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reservation" className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Aplicación y Reservas</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Título</Label>
                    <Input {...form.register("reservation.title")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Descripción</Label>
                    <Textarea {...form.register("reservation.description")} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Texto Botón iOS</Label>
                      <Input {...form.register("reservation.buttonIos")} />
                    </div>
                    <div className="space-y-2">
                      <Label>Texto Botón Android</Label>
                      <Input {...form.register("reservation.buttonAndroid")} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="online" className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Estudio Online & Patreon</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Título Principal</Label>
                    <Input {...form.register("online.title")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Título Patreon</Label>
                    <Input {...form.register("online.patreonTitle")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Descripción Patreon</Label>
                    <Textarea {...form.register("online.patreonDescription")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Precio</Label>
                    <Input {...form.register("online.patreonPrice")} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="about" className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Sobre Nosotros</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                   <div className="space-y-2">
                    <Label>Imagen Principal URL</Label>
                    <Input {...form.register("about.image")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Párrafo 1</Label>
                    <Textarea {...form.register("about.paragraphs.0")} className="h-24" />
                  </div>
                  <div className="space-y-2">
                    <Label>Párrafo 2</Label>
                    <Textarea {...form.register("about.paragraphs.1")} className="h-24" />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader><CardTitle>Información de Contacto</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input {...form.register("contact.email")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Instagram Handle</Label>
                    <Input {...form.register("contact.instagram")} />
                  </div>
                   <div className="space-y-2">
                    <Label>Dirección Física</Label>
                    <Input {...form.register("contact.location")} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </main>
    </div>
  );
}
