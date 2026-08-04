import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SITE_URL = "https://rbixtechnologies.com";
const FAVICON =
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect x="0" y="0" width="20" height="20" fill="%231d1d1f"/><rect x="80" y="0" width="20" height="20" fill="%231d1d1f"/><rect x="20" y="20" width="20" height="20" fill="%231d1d1f"/><rect x="60" y="20" width="20" height="20" fill="%231d1d1f"/><rect x="40" y="40" width="20" height="20" fill="%231d1d1f"/><rect x="20" y="60" width="20" height="20" fill="%231d1d1f"/><rect x="60" y="60" width="20" height="20" fill="%231d1d1f"/><rect x="0" y="80" width="20" height="20" fill="%231d1d1f"/><rect x="80" y="80" width="20" height="20" fill="%23e8321c"/></svg>';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RBiX Technologies | AI & Automation, Software, Apps, Analytics",
    template: "%s | RBiX Technologies",
  },
  description:
    "RBiX Technologies replaces manual, disconnected workflows with automated, data-driven systems: AI & automation, web & custom software, mobile apps, and data analytics.",
  icons: { icon: FAVICON },
  openGraph: {
    type: "website",
    siteName: "RBiX Technologies",
    title: "RBiX Technologies | AI & Automation, Software, Apps, Analytics",
    description:
      "RBiX Technologies replaces manual, disconnected workflows with automated, data-driven systems.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f1a2e",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
