import { Geist, Geist_Mono } from "next/font/google";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app/application.scss';

import { AuthProvider } from "@/contexts/AuthContext";
import { PomodoroProvider } from "@/contexts/PomodoroContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pomopanda",
  description: "Gerêncie sua produtividade com o Pomopanda",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AuthProvider>
          <PomodoroProvider>
            {children}
          </PomodoroProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
