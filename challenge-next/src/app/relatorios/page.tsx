/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import Head from "next/head";
import Header from "@/components/Header/Header";
import MobileMenu from "@/components/MobileMenu/MobileMenu";

const ReportsPage: React.FC = () => {
  const router = useRouter();

  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [reportType, setReportType] = useState<string>("general");
  const [reportTitle, setReportTitle] = useState<string>("");
  const [reportNotes, setReportNotes] = useState<string>("");
  const [generatingReport, setGeneratingReport] = useState<boolean>(false);
  const [showReportForm, setShowReportForm] = useState<boolean>(false);
  const [reportsData, setReportsData] = useState({
    total: 0,
    pendente: 0,
    cancelada: 0,
    concluida: 0,
    mecanica: 0,
    eletrica: 0,
    software: 0,
    outro: 0,
  });
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      router.push(routes.login);
    }
  }, [router]);

  // Função para converter a data garantindo o horário local (00:00)
  const parseDate = (dateString: string) => {
    if (!dateString) return null;
    return new Date(`${dateString}T00:00`);
  };

  // Carrega as falhas do localStorage e aplica os filtros de data, se definidos.
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedFalhas = localStorage.getItem("falhas");
      if (storedFalhas) {
        let parsedFalhas = JSON.parse(storedFalhas);

        if (startDate) {
          const start = parseDate(startDate);
          if (start) {
            parsedFalhas = parsedFalhas.filter(
              (f: any) => new Date(f.timestamp) >= start
            );
          }
        }
        if (endDate) {
          const end = parseDate(endDate);
          if (end) {
            end.setHours(23, 59, 59, 999);
            parsedFalhas = parsedFalhas.filter(
              (f: any) => new Date(f.timestamp) <= end
            );
          }
        }

        const total = parsedFalhas.length;
        const pendente = parsedFalhas.filter(
          (f: any) => f.status === "Pendente"
        ).length;
        const cancelada = parsedFalhas.filter(
          (f: any) => f.status === "Cancelada"
        ).length;
        const concluida = parsedFalhas.filter(
          (f: any) => f.status === "Concluída"
        ).length;
        const mecanica = parsedFalhas.filter(
          (f: any) => f.tipo === "Mecânica"
        ).length;
        const eletrica = parsedFalhas.filter(
          (f: any) => f.tipo === "Elétrica"
        ).length;
        const software = parsedFalhas.filter(
          (f: any) => f.tipo === "Software"
        ).length;
        const outro = parsedFalhas.filter(
          (f: any) => f.tipo === "Outro"
        ).length;

        setReportsData({
          total,
          pendente,
          cancelada,
          concluida,
          mecanica,
          eletrica,
          software,
          outro,
        });
      }
    }
  }, [startDate, endDate]);

  const clearFilters = () => {
    setStartDate("");
    setEndDate("");
  };

  const formatDateBR = (dateString: string) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";

      return date.toLocaleDateString("pt-BR");
    } catch (e) {
      return "";
    }
  };

  const openReportForm = () => {
    const defaultTitle =
      reportType === "general"
        ? "Relatório Geral"
        : `Relatório de ${formatDateBR(startDate) || "Início"} até ${
            formatDateBR(endDate) || "Agora"
          }`;

    setReportTitle(defaultTitle);
    setShowReportForm(true);
  };

  const generateReport = () => {
    setGeneratingReport(true);

    setTimeout(() => {
      const finalTitle =
        reportTitle ||
        (reportType === "general"
          ? "Relatório Geral"
          : `Relatório de ${formatDateBR(startDate) || "Início"} até ${
              formatDateBR(endDate) || "Agora"
            }`);

      const reportData = {
        title: finalTitle,
        generated: new Date().toISOString(),
        data: reportsData,
        notes: reportNotes,
        period:
          reportType === "period"
            ? {
                startDate,
                endDate,
                startDateFormatted: formatDateBR(startDate),
                endDateFormatted: formatDateBR(endDate),
              }
            : null,
      };

      console.log("Relatório gerado:", reportData);

      const savedReports = JSON.parse(
        localStorage.getItem("savedReports") || "[]"
      );
      savedReports.push(reportData);
      localStorage.setItem("savedReports", JSON.stringify(savedReports));

      alert(`Relatório "${finalTitle}" gerado com sucesso!`);
      setGeneratingReport(false);
      setShowReportForm(false);
      setReportNotes("");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-marmota-light font-sans">
      <Head>
        <title>Relatórios - Marmota Mobilidade</title>
        <meta
          name="description"
          content="Página de relatórios do sistema de mobilidade"
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <MobileMenu
        menuOpen={false}
        setMenuOpen={function (open: boolean): void {
          throw new Error("Function not implemented.");
        }}
        handleLogout={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-marmota-surface rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <h3 className="font-semibold text-gray-800 min-w-32">
                Tipo de Relatório:
              </h3>
              <div className="flex space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-marmota-primary"
                    name="reportType"
                    value="general"
                    checked={reportType === "general"}
                    onChange={() => setReportType("general")}
                  />
                  <span className="ml-2 text-gray-700">Geral</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    className="form-radio text-marmota-primary"
                    name="reportType"
                    value="period"
                    checked={reportType === "period"}
                    onChange={() => setReportType("period")}
                  />
                  <span className="ml-2 text-gray-700">Por Período</span>
                </label>
              </div>
            </div>

            {reportType === "period" && (
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1">
                  <label className="text-sm text-gray-700">De:</label>
                  <input
                    type="date"
                    className="w-full border text-gray-500 border-gray-300 rounded-md p-1"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="flex-1">
                  <label className="text-sm text-gray-700">Até:</label>
                  <input
                    type="date"
                    className="w-full border text-gray-500 border-gray-300 rounded-md p-1"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <button
                  onClick={clearFilters}
                  className="bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-md cursor-pointer"
                >
                  Limpar Filtros
                </button>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={openReportForm}
                className="cursor-pointer flex items-center bg-marmota-primary text-white px-4 py-2 rounded-md shadow-sm hover:bg-marmota-secondary transition-colors"
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
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Criar Relatório
              </button>
            </div>
          </div>
        </div>

        {showReportForm && (
          <div className="fixed inset-0  bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl mx-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Criar Relatório
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Título do Relatório
                  </label>
                  <input
                    type="text"
                    className="w-full border border-gray-300 text-gray-500 rounded-md p-2"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="Digite um título para o relatório"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Observações e Notas
                  </label>
                  <textarea
                    className="w-full border border-gray-300 text-gray-500 rounded-md p-2 min-h-32"
                    value={reportNotes}
                    onChange={(e) => setReportNotes(e.target.value)}
                    placeholder="Adicione informações adicionais, contexto ou notas para este relatório..."
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-md">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">
                    Resumo dos dados:
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>Total de falhas: {reportsData.total}</li>
                    <li>
                      Pendentes: {reportsData.pendente} | Concluídas:{" "}
                      {reportsData.concluida} | Canceladas:{" "}
                      {reportsData.cancelada}
                    </li>
                    <li>
                      Tipo: Mecânica ({reportsData.mecanica}), Elétrica (
                      {reportsData.eletrica}), Software ({reportsData.software}
                      ), Outro ({reportsData.outro})
                    </li>
                    {reportType === "period" && (
                      <li>
                        Período: {formatDateBR(startDate) || "Início"} até{" "}
                        {formatDateBR(endDate) || "Agora"}
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowReportForm(false)}
                  className="cursor-pointer px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  onClick={generateReport}
                  disabled={generatingReport}
                  className={`cursor-pointer flex items-center bg-marmota-primary text-white px-4 py-2 rounded-md shadow-sm hover:bg-marmota-secondary transition-colors ${
                    generatingReport ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {generatingReport ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="cursor-pointeropacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Gerando...
                    </>
                  ) : (
                    "Gerar Relatório"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Resumo Geral
            </h3>
            <p className="text-gray-800">
              Total de Falhas: <strong>{reportsData.total}</strong>
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Por Status
            </h3>
            <ul className="text-gray-800">
              <li>
                Pendente: <strong>{reportsData.pendente}</strong>
              </li>
              <li>
                Cancelada: <strong>{reportsData.cancelada}</strong>
              </li>
              <li>
                Concluída: <strong>{reportsData.concluida}</strong>
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Por Tipo
            </h3>
            <ul className="text-gray-800">
              <li>
                Mecânica: <strong>{reportsData.mecanica}</strong>
              </li>
              <li>
                Elétrica: <strong>{reportsData.eletrica}</strong>
              </li>
              <li>
                Software: <strong>{reportsData.software}</strong>
              </li>
              <li>
                Outro: <strong>{reportsData.outro}</strong>
              </li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Relatórios Salvos
            </h3>
            <div className="text-gray-800 max-h-48 overflow-y-auto">
              {typeof window !== "undefined" &&
              localStorage.getItem("savedReports") &&
              JSON.parse(localStorage.getItem("savedReports") || "[]").length >
                0 ? (
                <ul className="divide-y">
                  {JSON.parse(localStorage.getItem("savedReports") || "[]").map(
                    (report: any, index: number) => (
                      <li key={index} className="py-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{report.title}</span>
                          <span className="text-sm text-gray-500">
                            {formatDateBR(report.generated)}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {report.period
                            ? `Período: ${
                                report.period.startDateFormatted || "Início"
                              } até ${
                                report.period.endDateFormatted || "Agora"
                              }`
                            : "Relatório Geral"}
                        </div>
                        {report.notes && (
                          <div className="text-sm text-gray-600 mt-1 italic">
                            {report.notes.length > 100
                              ? report.notes.substring(0, 100) + "..."
                              : report.notes}
                          </div>
                        )}
                      </li>
                    )
                  )}
                </ul>
              ) : (
                <p className="text-gray-500 italic">Nenhum relatório salvo</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-8 py-4 text-center text-sm text-marmota-gray">
        <div className="max-w-7xl mx-auto px-4">
          © 2025 Marmota Mobilidade. Todos os direitos reservados.
        </div>
      </footer>
    </div>
  );
};

export default ReportsPage;