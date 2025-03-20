"use client";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import Image from "next/image";
import Head from "next/head";

// Dados dos membros da equipe
const membrosEquipe = [
  {
    id: 1,
    nome: "João Alves",
    rm: "RM559369",
    turma: "1TDSPB",
    foto: "/membros/Joao.jpeg",
  },
  {
    id: 2,
    nome: "Juan Coelho",
    rm: "RM560445",
    turma: "1TDSPB",
    foto: "/membros/Juan.jpeg",
  },
  {
    id: 3,
    nome: "Matheus Mariotto",
    rm: "RM560276",
    turma: "1TDSPB",
    foto: "/membros/Matheus.jpeg",
  },
];

export default function MembrosPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-marmota-light font-sans flex flex-col">
      <Head>
        <title>Membros da Equipe | Marmota Mobilidade</title>
        <meta
          name="description"
          content="Conheça os membros da equipe Marmota Mobilidade"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-gradient-to-r from-marmota-primary to-marmota-secondary shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="h-10 w-10 relative mr-3">
                <Image
                  src="/marmota-icon.png"
                  alt="Marmota Logo"
                  width={40}
                  height={40}
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

            {/* Botão para voltar */}
            <button
              onClick={() => router.push(routes.login)}
              className="cursor-pointer text-white hover:text-gray-200 flex items-center text-sm font-medium"
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
                  d="M11 17l-5-5m0 0l5-5m-5 5h12"
                />
              </svg>
              Voltar para Login
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="font-display font-bold text-3xl text-marmota-dark mb-3">
            Nossa Equipe
          </h1>
          <p className="max-w-2xl mx-auto text-marmota-gray">
            Conheça os membros da equipe responsável pelo desenvolvimento do
            sistema Marmota Mobilidade.
          </p>
        </div>

        {/* Grid de cards dos membros */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {membrosEquipe.map((membro) => (
            <div
              key={membro.id}
              className="bg-marmota-surface rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
            >
              {/* Barra decorativa superior */}
              <div className="h-2 bg-gradient-to-r from-marmota-primary to-marmota-secondary"></div>

              <div className="p-6 flex flex-col items-center">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md mb-4 relative">
                  <Image
                    src={membro.foto}
                    alt={`Foto de ${membro.nome}`}
                    width={128}
                    height={128}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // Cast do 'e.target' para HTMLImageElement
                      const target = e.target as HTMLImageElement;
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        membro.nome
                      )}&background=random&color=fff&size=128`;
                    }}
                  />
                </div>

                {/* Informações do membro */}
                <h3 className="font-display font-semibold text-xl text-marmota-dark mb-1">
                  {membro.nome}
                </h3>

                {/* Tags de informação em linha */}
                <div className="flex flex-wrap justify-center gap-2 mb-3">
                  {/* RM */}
                  <div className="bg-marmota-light px-3 py-1 rounded-full text-marmota-gray text-sm font-medium">
                    {membro.rm}
                  </div>

                  {/* Turma */}
                  <div className="bg-marmota-primary bg-opacity-10 px-3 py-1 rounded-full white text-sm font-medium">
                    {membro.turma}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-sm text-marmota-gray">
            © 2025 Marmota Mobilidade. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}