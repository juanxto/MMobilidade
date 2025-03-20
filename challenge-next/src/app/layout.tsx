import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marmota Mobilidade",
  description: "Sistema de gestão de falhas e relatórios",
  icons: {
    icon: "/marmota-icon.png",
    shortcut: "/marmota-icon.png",
    apple: "/marmota-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt">
      <head>
        <link rel="icon" href="/marmota-icon.png" sizes="any" />
        <link rel="icon" href="/marmota-icon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/marmota-icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
