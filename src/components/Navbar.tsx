// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { Home, LayoutDashboard, Menu, Settings2, Users, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const routes = [
    { path: "/", label: "Home", icon: <Home size={19} /> },
    { path: "/users", label: "Users", icon: <Users size={19} /> },
    { path: "/settings", label: "Settings", icon: <Settings2 size={19} /> },
  ];

  return (
    <nav className="bg-green-600 text-white px-4 py-3">
      <div className="max-w-6xl mx-auto flex gap-8 items-center">
        {/* Logo / Title */}
        <div className="text-xl font-bold">Faraz Task Project</div>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6">
          {routes.map((r) => (
            <Link
              key={r.path}
              href={r.path}
              className="flex hover:text-gray-200 transition"
            >
              {r.icon}
              {r.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2">
          {routes.map((r) => (
            <Link
              key={r.path}
              href={r.path}
              className="flex hover:text-gray-200 transition"
            >
              {r.icon}
              {r.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
