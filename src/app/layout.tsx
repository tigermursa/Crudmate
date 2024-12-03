import type { Metadata } from "next";
import localFont from "next/font/local";
import { FaHistory, FaChartPie, FaSearch, FaRegUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import "./globals.css";

// react toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Slide } from "react-toastify";
import { SWRProvider } from "@/utils/swr-config";

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
  { name: "Home", icon: <IoHome />, path: "/" },
  { name: "Add User", icon: <IoMdAdd />, path: "/create-user" },
  { name: "Deleted", icon: <FaHistory />, path: "/deleted-users" },
  { name: "Search", icon: <FaSearch />, path: "/search" },
  { name: "Single", icon: <FaRegUser />, path: "/single-user" },
  { name: "Analytics", icon: <FaChartPie />, path: "/analytics" },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <div className="flex h-screen bg-gray-100">
          {/* Sidebar */}
          <aside className="bg-gray-900 text-white flex flex-col">
            <h1 className="hidden md:block text-2xl font-bold p-6 border-b border-gray-700">
              CRUD MATE
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
          <main className="flex-1">
            {/* react toastify */}
            <ToastContainer
              position="top-center"
              autoClose={2500}
              transition={Slide}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            <SWRProvider>{children}</SWRProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
