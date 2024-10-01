"use client";
import React from "react";
import TableEditor from "../../components/dashboard/TableEditor"; // Ajusta la ruta según la ubicación de tu componente

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-bold text-2xl">Dashboard</h1>

      {/* Mostrar el editor con soporte de tablas */}
      <TableEditor />
    </div>
  );
}
