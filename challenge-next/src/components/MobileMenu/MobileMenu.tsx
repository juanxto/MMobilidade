"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";

interface MobileMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  handleLogout: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  menuOpen,
  setMenuOpen,
  handleLogout,
}) => {
  const router = useRouter();

  if (!menuOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50 overflow-hidden">
      {/* Background com backdrop filter para desfoco */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={() => setMenuOpen(false)}
      ></div>

      {/* Menu flutuante */}
      <div className="absolute top-16 right-4 w-64 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-xl bg-white/90 backdrop-blur-md shadow-xl transform transition-all duration-300 ease-in-out">
        <div className="divide-y divide-gray-100/50">
          {/* Perfil do usuário */}
          <div className="p-4 flex items-center space-x-3">
            <div className="h-12 w-12 bg-marmota-primary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              U
            </div>
            <div>
              <div className="font-medium text-gray-900">Usuário</div>
              <div className="text-sm text-gray-500">Administrador</div>
            </div>
          </div>

          {/* Links de navegação */}
          <nav className="p-2">
            <button
              onClick={() => {
                router.push(routes.dashboard);
                setMenuOpen(false);
              }}
              className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-marmota-light hover:text-marmota-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              Falhas
            </button>

            <button
              onClick={() => {
                router.push(routes.reports);
                setMenuOpen(false);
              }}
              className="flex items-center w-full p-3 rounded-lg text-gray-700 hover:bg-marmota-light hover:text-marmota-primary transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Relatórios
            </button>
          </nav>

          {/* Logout */}
          <div className="p-2">
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex items-center w-full p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-3"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;