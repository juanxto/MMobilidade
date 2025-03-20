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
