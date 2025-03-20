"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import Image from "next/image";
import MobileMenu from "@/components/MobileMenu/MobileMenu";

const Header: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth");
    router.push(routes.login);
  };

  return (
    <header className="bg-gradient-to-r from-marmota-primary to-marmota-secondary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="relative h-10 w-10 mr-3">
              <Image
                src="/marmota-icon.png"
                alt="Marmota Logo"
                fill
                style={{ objectFit: "contain" }}
                className="drop-shadow-md"
              />
            </div>
            <div className="text-white font-display">
              <div className="font-semibold text-lg leading-none">Marmota</div>
              <div className="font-medium text-sm tracking-wide">
                Mobilidade
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => router.push(routes.dashboard)}
              className="text-white hover:text-marmota-light transition-colors text-sm font-medium tracking-wide cursor-pointer"
            >
              Falhas
            </button>
            <button
              onClick={() => router.push(routes.reports)}
              className="text-white hover:text-marmota-light transition-colors text-sm font-medium tracking-wide cursor-pointer"
            >
              Relatórios
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center text-white hover:text-marmota-light transition-colors text-sm font-medium tracking-wide cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Sair
            </button>
            <div className="h-8 w-8 bg-white rounded-full shadow-md flex items-center justify-center text-marmota-primary font-medium">
              U
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <div className="h-8 w-8 bg-white rounded-full shadow-md flex items-center justify-center text-marmota-primary font-medium mr-3">
              U
            </div>
            <button onClick={toggleMenu} className="text-white p-1">
              {menuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      <MobileMenu
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        handleLogout={handleLogout}
      />
    </header>
  );
};

export default Header;