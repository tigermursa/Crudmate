"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IoHome } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { FaChartPie, FaSearch, FaRegUser } from "react-icons/fa";

const demoItems = [
  { name: "Home", icon: <IoHome />, path: "/" },
  { name: "Add User", icon: <IoMdAdd />, path: "/create-user" },
  { name: "Search", icon: <FaSearch />, path: "/search" },
  { name: "Single", icon: <FaRegUser />, path: "/single-user" },
  { name: "Analytics", icon: <FaChartPie />, path: "/analytics" },
  {
    name: "Recycle Bin",
    icon: (
      <Image
        width={620}
        height={620}
        src="https://img.icons8.com/color/512/bin-windows.png"
        alt="Recycle Bin"
        className="w-6 h-6"
      />
    ),
    path: "/deleted-users",
  },
];

export default function Dashboard() {
  const pathname = usePathname();

  return (
    <aside className="bg-gray-900 text-white flex flex-col w-64 flex-shrink-0">
      <h1 className="hidden md:block text-2xl font-bold p-6 border-b border-gray-700">
        CRUD MATE
      </h1>
      <nav className="flex-1">
        <ul className="space-y-2 px-4 py-6">
          {demoItems.map((item, index) => (
            <li
              key={index}
              className={`
                flex md:items-center md:space-x-3 p-3 rounded-md text-center md:text-left
                ${pathname === item.path ? "bg-gray-700" : "hover:bg-gray-700"}
              `}
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
  );
}
