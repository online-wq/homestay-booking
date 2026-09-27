import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.greenhillretreatchibbo.com"),
  title: "Green Hill Retreat | Kalimpong Homestay",
  description: "Your serene getaway in Kalimpong",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.PNG",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        name: "Green Hill Retreat",
        url: "https://www.greenhillretreatchibbo.com",
        telephone: ["+91-6290566875", "+91-9830058237"],
        email: "online@greenhillretreatchibbo.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kalimpong",
          addressRegion: "West Bengal",
          postalCode: "734301",
          addressCountry: "IN",
        },
      }),
    }}
  />
  {children}
</body>
    </html>
  );
}
