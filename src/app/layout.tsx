import type { Metadata } from "next";
import { Roboto_Mono, Space_Grotesk } from "next/font/google";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/AuthContext";
import AISearchButton from "@/components/ai-search/AISearchButton";
import "./globals.css";

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MiCultura — Eventos Culturales de Tenerife",
  description:
    "Descubre y explora eventos culturales en Tenerife: festivales, conciertos, exposiciones, talleres y mucho más.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${robotoMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          <AISearchButton />
          <Toaster richColors position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
