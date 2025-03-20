/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import Head from "next/head";
import Header from "@/components/Header/Header";
import MobileMenu from "@/components/MobileMenu/MobileMenu";

const DashboardPage: React.FC = () => {
  const router = useRouter();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [tipoFalha, setTipoFalha] = useState<string>("Mecânica");
  const [falhas, setFalhas] = useState<Falha[]>([]);
  const [filteredFalhas, setFilteredFalhas] = useState<any[]>([]);
  const [appliedFilter, setAppliedFilter] = useState<boolean>(false);
  const [tipoFiltro, setTipoFiltro] = useState<string>("Todos");
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // Estados para o modal de detalhes com atualização de status
  const [selectedFalha, setSelectedFalha] = useState<Falha | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
  const [modalStatus, setModalStatus] = useState<string>("Pendente");

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      router.push(routes.login);
    }
  }, [router]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const falhasSalvas = localStorage.getItem("falhas");
      if (falhasSalvas) {
        const parsedFalhas = JSON.parse(falhasSalvas);
        setFalhas(parsedFalhas);
        setFilteredFalhas(parsedFalhas);
      }
    }
  }, []);

  const adicionarFalha = () => {
    if (!description.trim()) {
      alert("Por favor, adicione uma descrição para a falha");
      return;
    }

    const dataAtual = new Date();
    const dataFormatada = dataAtual.toLocaleDateString("pt-BR");
    const horaFormatada = dataAtual.toLocaleTimeString("pt-BR");

    // Gera automaticamente um ID usando Date.now()
    const novaFalha = {
      id: Date.now(),
      tipo: tipoFalha,
      descricao: description,
      data: dataFormatada,
      hora: horaFormatada,
      timestamp: dataAtual.getTime(),
      status: "Pendente",
    };

    const novasFalhas = [novaFalha, ...falhas];
    setFalhas(novasFalhas);

    if (!appliedFilter) {
      setFilteredFalhas(novasFalhas);
    } else {
      aplicarFiltro(novasFalhas);
    }

    localStorage.setItem("falhas", JSON.stringify(novasFalhas));
    setDescription("");

    if (window.innerWidth < 768) {
      setShowAddModal(false);
    }
  };

  const filtrarFalhas = (falhasParaFiltrar?: any[], tipoParam?: string) => {
    const falhasToFilter = falhasParaFiltrar || falhas;
    const tipoToUse = tipoParam !== undefined ? tipoParam : tipoFiltro;

    let resultado = [...falhasToFilter];

    if (tipoToUse !== "Todos") {
        resultado = resultado.filter((falha) => falha.tipo === tipoToUse);
    }

    if (!startDate && !endDate) {
        return resultado;
    }

    return resultado.filter((falha) => {
        const falhaDate = new Date(falha.timestamp);

        // Criar datas garantindo que não haja deslocamento de fuso horário
        const dataInicio = startDate ? new Date(`${startDate}T00:00:00.000Z`) : null;
        const dataFim = endDate ? new Date(`${endDate}T23:59:59.999Z`) : null;

        if (dataInicio) dataInicio.setMinutes(dataInicio.getMinutes() + dataInicio.getTimezoneOffset());
        if (dataFim) dataFim.setMinutes(dataFim.getMinutes() + dataFim.getTimezoneOffset());

        if (dataInicio && dataFim) {
            return falhaDate >= dataInicio && falhaDate <= dataFim;
        } else if (dataInicio) {
            return falhaDate >= dataInicio;
        } else if (dataFim) {
            return falhaDate <= dataFim;
        }
        return true;
    });
};

const aplicarFiltro = (falhasParaFiltrar?: any[]) => {
    const falhasFiltradas = filtrarFalhas(falhasParaFiltrar);
    setFilteredFalhas(falhasFiltradas);

    const temFiltroAplicado = startDate || endDate || tipoFiltro !== "Todos";
    setAppliedFilter(!!temFiltroAplicado);
  };

  const limparFiltros = () => {
    setStartDate("");
    setEndDate("");
    setTipoFiltro("Todos");
    setFilteredFalhas(falhas);
    setAppliedFilter(false);
  };

  const filtrarPorTipo = (tipo: string) => {
    setTipoFiltro(tipo);
    const falhasFiltradas = filtrarFalhas(falhas, tipo);
    setFilteredFalhas(falhasFiltradas);

    const temFiltroAplicado = startDate || endDate || tipo !== "Todos";
    setAppliedFilter(!!temFiltroAplicado);
  };

  const getTipoClass = (tipo: string) => {
    switch (tipo) {
      case "Mecânica":
        return "bg-blue-100 text-blue-800";
      case "Elétrica":
        return "bg-yellow-100 text-yellow-800";
      case "Estrutural":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

    // Abre o modal de detalhes, definindo a falha selecionada e seu status atual
    const openDetailsModal = (falha: any) => {
        setSelectedFalha(falha);
        setModalStatus(falha.status || "Pendente");
        setShowDetailsModal(true);
      };
      interface Falha {
        id: string | number;
        status: string; 
        tipo: string; 
        descricao: string; 
        data: string; 
        hora: string; 
      }
      
      // Atualiza o status da falha e persiste a alteração
      const updateFalhaStatus = () => {
        if (selectedFalha) {
          const updatedFalha = { ...selectedFalha, status: modalStatus };
          const updatedFalhas = falhas.map((f) =>  
            f.id === selectedFalha.id ? updatedFalha : f
          );
          setFalhas(updatedFalhas);
          aplicarFiltro(updatedFalhas);
          localStorage.setItem("falhas", JSON.stringify(updatedFalhas));
          setSelectedFalha(updatedFalha);
        }
      };

      // Função para formatar data para exibição
  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "";
    
    // Criar uma nova data com o fuso horário local
    const date = new Date(dateString);
    
    // Formatar para DD/MM/YYYY (formato brasileiro)
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-marmota-light font-sans">
      <Head>
        <title>Marmota Mobilidade</title>
        <meta name="description" content="Sistema de gestão de mobilidade" />
        <link rel="icon" href="/marmota-icon.png" sizes="any" />
        <link rel="icon" href="/marmota-icon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/marmota-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Header */}
      <Header/>
      {/* Mobile Navigation */}
      <MobileMenu menuOpen={false} setMenuOpen={function (): void {
        throw new Error("Function not implemented.");
      } } handleLogout={function (): void {
        throw new Error("Function not implemented.");
      } }/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row mt-4">
          {/* Sidebar (Desktop) */}
          <div className="hidden md:block w-full md:w-60 bg-marmota-surface rounded-xl shadow-md md:mr-6 md:sticky md:top-4 md:self-start md:max-h-[calc(100vh-2rem)] md:overflow-y-auto mb-4 md:mb-0">
            <div className="p-5 border-b border-gray-100">
              <h3 className="font-display font-semibold text-marmota-dark text-lg">
                Menu
              </h3>
            </div>
            {/* Filtro por Tipo */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center mb-4">
                <h4 className="font-display font-medium text-marmota-dark">
                  Filtro por Tipo
                </h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2 text-marmota-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <div className="bg-white rounded-lg p-3 shadow-sm transition-all hover:shadow-md">
                  <select
                    className="w-full bg-white text-sm p-1.5 outline-none border border-gray-200 rounded-md text-marmota-dark font-medium"
                    value={tipoFiltro}
                    onChange={(e) => filtrarPorTipo(e.target.value)}
                  >
                    <option value="Todos">Todos</option>
                    <option value="Mecânica">Mecânica</option>
                    <option value="Elétrica">Elétrica</option>
                    <option value="Software">Software</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>
                {tipoFiltro !== "Todos" && (
                  <div className="text-xs text-marmota-primary text-center font-medium mt-2">
                    Filtrado por: {tipoFiltro}
                  </div>
                )}
              </div>
            </div>
            {/* Filtro de Data */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-center mb-4">
                <h4 className="font-display font-medium text-marmota-dark">
                  Filtro de Data
                </h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2 text-marmota-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 shadow-sm transition-all hover:shadow-md">
                  <label className="text-sm font-medium mb-1.5 block text-marmota-gray">
                    De:
                  </label>
                  <input
                    type="date"
                    className="text-sm w-full bg-white outline-none border border-gray-200 rounded-md p-1.5 text-marmota-dark font-mono"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm transition-all hover:shadow-md">
                  <label className="text-sm font-medium mb-1.5 block text-marmota-gray">
                    Até:
                  </label>
                  <input
                    type="date"
                    className="text-sm w-full bg-white outline-none border border-gray-200 rounded-md p-1.5 text-marmota-dark font-mono"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => aplicarFiltro()}
                    className=" cursor-pointer flex-1 bg-gradient-to-r from-marmota-primary to-marmota-secondary hover:from-marmota-secondary hover:to-marmota-primary text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow transform hover:translate-y-px"
                  >
                    Filtrar
                  </button>
                  {appliedFilter && (
                    <button
                      onClick={limparFiltros}
                      className="cursor-pointer bg-gray-200 text-marmota-gray text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-300 hover:bg-gray-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
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
                    </button>
                  )}
                </div>
              </div>
            </div>
            {/* Adicionar Falha (Desktop) */}
            <div className="p-5">
              <div className="flex items-center mb-4">
                <h4 className="font-display font-medium text-marmota-dark">
                  Adicionar Falha
                </h4>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2 text-marmota-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-3 shadow-sm transition-all hover:shadow-md">
                  <label className="text-sm font-medium mb-1.5 block text-marmota-gray">
                    Tipo:
                  </label>
                  <select
                    className="w-full bg-white text-sm p-1.5 outline-none border border-gray-200 rounded-md text-marmota-dark font-medium"
                    value={tipoFalha}
                    onChange={(e) => setTipoFalha(e.target.value)}
                  >
                    <option>Mecânica</option>
                    <option>Elétrica</option>
                    <option>Software</option>
                    <option>Outro</option>
                  </select>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm transition-all hover:shadow-md">
                  <label className="text-sm font-medium mb-1.5 block text-marmota-gray">
                    Descrição:
                  </label>
                  <textarea
                    className="w-full h-24 bg-white text-sm outline-none resize-none text-marmota-dark border border-gray-200 rounded-md p-2 font-medium"
                    placeholder="Insira a descrição..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <button
                  onClick={adicionarFalha}
                  className="cursor-pointer
                  w-full bg-gradient-to-r from-marmota-primary to-marmota-secondary hover:from-marmota-secondary hover:to-marmota-primary text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow transform hover:translate-y-px"
                >
                  Adicionar
                </button>
              </div>
            </div>
          </div>

          {/* Filtros Mobile */}
          <div className="md:hidden mb-4">
            <div className="bg-marmota-surface rounded-xl shadow-md p-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-display font-medium text-marmota-dark text-sm">
                  Filtros
                </h4>
                {appliedFilter && (
                  <button
                    onClick={limparFiltros}
                    className="text-xs text-marmota-primary flex items-center cursor-pointer
                    "
                  >
                    Limpar
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 ml-1"
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
                  </button>
                )}
              </div>

              {/* Filtros lado a lado */}
              <div className="flex space-x-2">
                {/* Filtro por Tipo */}
                <div className="flex-1">
                  <div className="bg-white rounded-lg p-2 shadow-sm transition-all hover:shadow-md">
                    <label className="text-xs font-medium mb-1 block text-marmota-gray">
                      Tipo:
                    </label>
                    <select
                      className="w-full bg-white text-xs p-1 outline-none border border-gray-200 rounded-md text-marmota-dark font-medium"
                      value={tipoFiltro}
                      onChange={(e) => filtrarPorTipo(e.target.value)}
                    >
                      <option value="Todos">Todos</option>
                      <option value="Mecânica">Mecânica</option>
                      <option value="Elétrica">Elétrica</option>
                      <option value="Software">Software</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>

                {/* Filtro de Data (De) */}
                <div className="flex-1">
                  <div className="bg-white rounded-lg p-2 shadow-sm transition-all hover:shadow-md">
                    <label className="text-xs font-medium mb-1 block text-marmota-gray">
                      De:
                    </label>
                    <input
                      type="date"
                      className="text-xs w-full bg-white outline-none border border-gray-200 rounded-md p-1 text-marmota-dark font-mono"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>

                {/* Filtro de Data (Até) */}
                <div className="flex-1">
                  <div className="bg-white rounded-lg p-2 shadow-sm transition-all hover:shadow-md">
                    <label className="text-xs font-medium mb-1 block text-marmota-gray">
                      Até:
                    </label>
                    <input
                      type="date"
                      className="text-xs w-full bg-white outline-none border border-gray-200 rounded-md p-1 text-marmota-dark font-mono"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Botão de filtrar */}
              <div className="mt-2">
                <button
                  onClick={() => aplicarFiltro()}
                  className="w-full bg-gradient-to-r cursor-pointer
                  from-marmota-primary to-marmota-secondary hover:from-marmota-secondary hover:to-marmota-primary text-white text-xs font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow"
                >
                  Aplicar Filtros
                </button>
              </div>

              {/* Indicadores de filtro aplicado */}
              {appliedFilter && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {tipoFiltro !== "Todos" && (
                    <span className="text-xs bg-marmota-primary/10 text-marmota-primary px-2 py-0.5 rounded-full">
                      Tipo: {tipoFiltro}
                    </span>
                  )}
                  {startDate && (
                    <span className="text-xs bg-marmota-primary/10 text-marmota-primary px-2 py-0.5 rounded-full">
                      De: {formatDateForDisplay(startDate)}
                    </span>
                  )}
                  {endDate && (
                    <span className="text-xs bg-marmota-primary/10 text-marmota-primary px-2 py-0.5 rounded-full">
                      Até: {formatDateForDisplay(endDate)}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Conteúdo (Listagem de Falhas) */}
          <div className="flex-1">
            <div className="bg-marmota-surface min-h-96 w-full shadow-md rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="font-display font-semibold text-xl text-marmota-dark flex items-center mb-2 sm:mb-0">
                  Visão Geral
                  {appliedFilter && (
                    <span className="ml-2 text-xs bg-marmota-primary/10 text-marmota-primary px-2 py-1 rounded-full flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                      </svg>
                      Filtrado
                    </span>
                  )}
                </h2>
                <div className="text-sm text-marmota-gray">
                  Total: {filteredFalhas.length} falha(s)
                </div>
              </div>

              {filteredFalhas.length === 0 ? (
                <div className="text-marmota-gray text-sm bg-white p-6 rounded-lg text-center">
                  Não há falhas registradas
                  {appliedFilter ? " com os filtros aplicados" : ""}.
                  {!appliedFilter && "Adicione uma falha para começar."}
                  {appliedFilter && (
                    <div className="mt-2">
                      <button
                        onClick={limparFiltros}
                        className="text-marmota-primary font-medium hover:underline cursor-pointer
                        "
                      >
                        Limpar filtros
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  {/* Desktop: Listagem com colunas para ID, Tipo, Descrição (somente botão), Data e Hora */}
                  <div className="hidden md:block">
                    <div className="grid grid-cols-5 gap-4 mb-2 font-medium text-sm text-marmota-gray px-2">
                      <div>ID</div>
                      <div>Tipo</div>
                      <div>Descrição</div>
                      <div>Data</div>
                      <div>Hora</div>
                    </div>
                    <div className="space-y-4">
                      {filteredFalhas.map((falha) => (
                        <div
                          key={falha.id}
                          className="grid grid-cols-5 gap-4 bg-white p-4 rounded-lg shadow-sm transition-all hover:shadow-md text-sm"
                        >
                          <div className="text-marmota-gray text-xs">
                            {falha.id}
                          </div>
                          <div className="font-medium text-marmota-primary">
                            <span
                              className={`inline-block px-3 py-1 rounded-full ${getTipoClass(
                                falha.tipo
                              )}`}
                            >
                              {falha.tipo}
                            </span>
                          </div>
                          <div className="text-marmota-dark">
                            <button
                              onClick={() => openDetailsModal(falha)}
                              className="text-marmota-primary text-xs underline cursor-pointer
                              "
                            >
                              Mostrar mais
                            </button>
                          </div>
                          <div className="text-marmota-gray text-xs">
                            {falha.data}
                          </div>
                          <div className="text-marmota-gray text-xs">
                            {falha.hora}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Mobile: Cada falha em card, exibindo ID, Tipo e botão "Mostrar mais" */}
                  <div className="md:hidden space-y-4">
                    {filteredFalhas.map((falha) => (
                      <div
                        key={falha.id}
                        className="bg-white p-4 rounded-lg shadow-sm transition-all hover:shadow-md text-sm"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="text-xs text-marmota-gray">
                            ID: {falha.id}
                          </div>
                          <span
                            className={`inline-block px-3 py-1 rounded-full ${getTipoClass(
                              falha.tipo
                            )}`}
                          >
                            {falha.tipo}
                          </span>
                        </div>
                        <div className="text-marmota-dark">
                          <button
                            onClick={() => openDetailsModal(falha)}
                            className="text-marmota-primary text-xs underline pointer"
                          >
                            Mostrar mais
                          </button>
                        </div>
                        <div className="text-xs text-marmota-gray mt-2 flex justify-between">
                          <span>{falha.data}</span>
                          <span>{falha.hora}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Botão de adicionar (Mobile) */}
      <button
        onClick={() => setShowAddModal(true)}
        className="md:hidden fixed z-10 bottom-4 right-4 bg-gradient-to-r from-marmota-primary to-marmota-secondary text-white p-3 rounded-full shadow-lg"
      >
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
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>

      {/* Modal para adicionar falha (Mobile) */}
      {showAddModal && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-medium text-gray-900">
                Adicionar Falha
              </h4>
              <button onClick={() => setShowAddModal(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
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
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3 shadow-sm transition-all hover:shadow-md">
                <label className="text-sm font-medium mb-1.5 block text-gray-700">
                  Tipo:
                </label>
                <select
                  className="w-full bg-white text-sm p-1.5 outline-none border border-gray-200 rounded-md text-gray-800 font-medium"
                  value={tipoFalha}
                  onChange={(e) => setTipoFalha(e.target.value)}
                >
                  <option>Mecânica</option>
                  <option>Elétrica</option>
                  <option>Software</option>
                  <option>Outro</option>
                </select>
              </div>
              <div className="bg-white rounded-lg p-3 shadow-sm transition-all hover:shadow-md">
                <label className="text-sm font-medium mb-1.5 block text-gray-700">
                  Descrição:
                </label>
                <textarea
                  className="w-full h-24 bg-white text-sm outline-none resize-none text-gray-800 border border-gray-200 rounded-md p-2 font-medium"
                  placeholder="Insira a descrição..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <button
                onClick={adicionarFalha}
                className="w-full bg-gradient-to-r from-marmota-primary to-marmota-secondary hover:from-marmota-secondary hover:to-marmota-primary text-white text-sm font-medium py-2.5 px-4 rounded-lg transition-all duration-300 shadow-sm hover:shadow transform hover:translate-y-px"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalhes da falha (Desktop e Mobile) */}
      {showDetailsModal && selectedFalha && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h4 className="font-display font-medium text-gray-900">
                Detalhes da Falha
              </h4>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedFalha(null);
                }}
                className="cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
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
              </button>
            </div>
            <div className="space-y-3 text-sm text-gray-800">
              <div>
                <strong>ID:</strong> {selectedFalha.id}
              </div>
              <div>
                <strong>Tipo:</strong> {selectedFalha.tipo}
              </div>
              <div>
                <strong>Descrição:</strong> {selectedFalha.descricao}
              </div>
              <div>
                <strong>Data:</strong> {selectedFalha.data}
              </div>
              <div>
                <strong>Hora:</strong> {selectedFalha.hora}
              </div>
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status:
                </label>
                <select
                  value={modalStatus}
                  onChange={(e) => setModalStatus(e.target.value)}
                  className="w-full bg-white text-sm p-1.5 border border-gray-200 rounded-md text-gray-800"
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Cancelada">Cancelada</option>
                  <option value="Concluída">Concluída</option>
                </select>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={updateFalhaStatus}
                className="cursor-pointer bg-gradient-to-r from-marmota-primary to-marmota-secondary text-white text-sm font-medium py-2 px-4 rounded-lg"
              >
                Atualizar Status
              </button>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedFalha(null);
                }}
                className="cursor-pointer bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="mt-8 py-4 text-center text-sm text-marmota-gray">
        <div className="max-w-7xl mx-auto px-4">
          © 2025 Marmota Mobilidade. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;