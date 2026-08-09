"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
    const links = [
        { href: "/", label: "Dashboard" },
        { href: "/watchlist", label: "Watchlist" },
        { href: "/portfolio", label: "Portfolio" },
    ];
  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 py-3">
        <span className="font-semibold text-lg">Helios</span>
        <ul className="flex gap-6">
          {links.map((link) => (
            <li key={link.href}>
            <Link
              href={link.href}
              className={pathname === link.href ? "text-blue-600 font-medium" : "text-gray-600"}
            >
              {link.label}
            </Link>
          </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}