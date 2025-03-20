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

  seEffect(() => {
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
