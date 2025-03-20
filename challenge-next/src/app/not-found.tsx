"use client";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import Image from "next/image";
import Head from "next/head";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-marmota-light font-sans flex flex-col">
      <Head>
        <title>Página não encontrada | Marmota Mobilidade</title>
        <meta name="description" content="Página não encontrada" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header simplificado */}
      <header className="bg-gradient-to-r from-marmota-primary to-marmota-secondary shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center">
              <div className="h-10 w-10 relative mr-3">
                <Image
                  src="/marmota-icon.png"
                  alt="Marmota Logo"
                  layout="fill"
                  objectFit="contain"
                  className="drop-shadow-md"
                />
              </div>
              <div className="text-white font-display">
                <div className="font-semibold text-lg leading-none">
                  Marmota
                </div>
                <div className="font-medium text-sm tracking-wide">
                  Mobilidade
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Card principal */}
          <div className="bg-marmota-surface rounded-xl shadow-md overflow-hidden">
            {/* Barra superior decorativa */}
            <div className="h-2 bg-gradient-to-r from-marmota-primary to-marmota-secondary"></div>

            <div className="p-8 text-center">
              <div className="mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 mx-auto text-marmota-primary opacity-80"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              <h2 className="font-display font-semibold text-2xl text-marmota-dark mb-3">
                Página Não Encontrada
              </h2>
              
              <p className="text-marmota-gray mb-6">
                A página que você está procurando não existe ou foi movida.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => router.push(routes.login)}
                  className="cursor-pointer w-full bg-gradient-to-r from-marmota-primary to-marmota-secondary hover:from-marmota-secondary hover:to-marmota-primary text-white text-sm font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow transform hover:translate-y-px flex justify-center items-center"
                >
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                      />
                    </svg>
                    Voltar para o Login
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Nota de rodapé */}
          <div className="mt-6 text-center text-sm text-marmota-gray">
            © 2025 Marmota Mobilidade. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </div>
  );
}