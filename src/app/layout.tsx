import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  FaRocket,
  FaChartPie,
  FaTachometerAlt,
  FaFire,
  FaThermometerHalf,
} from "react-icons/fa";
import Link from "next/link";
import "./globals.css";

// Fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Metadata
export const metadata: Metadata = {
  title: "Dashboard App",
  description: "A modern dashboard layout using Next.js",
};

// Sidebar items with paths
const demoItems = [
  { name: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { name: "Analytics", icon: <FaChartPie />, path: "/analytics" },
  { name: "Rockets", icon: <FaRocket />, path: "/rockets" },
  { name: "Fuel", icon: <FaFire />, path: "/fuel" },
  { name: "Temperature", icon: <FaThermometerHalf />, path: "/temperature" },
  { name: "Single", icon: <FaThermometerHalf />, path: "/single-user" },
];

// Root Layout
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="bg-gray-900 text-white flex flex-col">
            <h1 className="hidden md:block text-2xl font-bold p-6 border-b border-gray-700">
              Mission Control
            </h1>
            <nav className="flex-1">
              <ul className="space-y-2 px-4 py-6">
                {demoItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex md:items-center md:space-x-3 p-3 rounded-md hover:bg-gray-700 text-center md:text-left"
                  >
                    <Link href={item.path} className="w-full">
                      <div className="flex flex-col items-center md:flex-row md:space-x-3">
                        <div className="text-lg md:text-base">{item.icon}</div>
                        <span className="hidden md:block">{item.name}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
