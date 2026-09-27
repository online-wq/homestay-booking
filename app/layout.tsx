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
        image: "https://www.greenhillretreatchibbo.com/images/hero.jpeg",
logo: "https://www.greenhillretreatchibbo.com/logo.PNG",
geo: {
  "@type": "GeoCoordinates",
  latitude: 27.037694380200875,
  longitude: 88.44805850422719,
},
        telephone: ["+91-6290566875", "+91-9830058237"],
        email: "online@greenhillretreatchibbo.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kalimpong",
          streetAddress: "Upper Chibbo",
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
