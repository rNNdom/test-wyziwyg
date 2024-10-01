// TableCreator.tsx
import React, { useState } from "react";
import axios from "axios";

interface TableCreatorProps {
  onTableCreated: (
    title: string,
    columns: string[],
    data: any[],
    tableName: string
  ) => void; // Actualiza aquí
}

const TableCreator: React.FC<TableCreatorProps> = ({ onTableCreated }) => {
  const [selectedTable, setSelectedTable] = useState<string>("");
  const [tables, setTables] = useState<string[]>([]);

  const insertEmptyTable = () => {
    const columns = ["Columna 1", "Columna 2", "Columna 3"];
    const data = [
      { "Columna 1": "", "Columna 2": "", "Columna 3": "" },
      { "Columna 1": "", "Columna 2": "", "Columna 3": "" },
      { "Columna 1": "", "Columna 2": "", "Columna 3": "" },
    ];

    // Aquí pasamos el nombre de la tabla
    onTableCreated("Tabla Vacía", columns, data, "table_vacia"); // Cambia "table_vacia" al nombre que desees
  };

  const insertTableFromDatabase = async () => {
    if (selectedTable) {
      try {
        const response = await axios.get(
          `http://localhost:3000/table/${selectedTable}`
        );
        const data = response.data;

        if (data.length > 0) {
          const columns = Object.keys(data[0]);
          onTableCreated(
            `Tabla: ${selectedTable}`,
            columns,
            data,
            selectedTable
          ); // Pasamos el nombre de la tabla
        }
      } catch (error) {
        console.error("Error al cargar los datos de la tabla:", error);
      }
    }
  };

  const fetchTables = async () => {
    try {
      const response = await axios.get("http://localhost:3000/tables");
      setTables(response.data);
    } catch (error) {
      console.error("Error al obtener las tablas:", error);
    }
  };

  return (
    <div className="toolbar">
      <button onClick={insertEmptyTable}>Insertar tabla vacía</button>
      <button onClick={fetchTables}>Cargar tablas disponibles</button>
      {tables.length > 0 && (
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
        >
          <option value="">Selecciona una tabla</option>
          {tables.map((table) => (
            <option key={table} value={table}>
              {table}
            </option>
          ))}
        </select>
      )}
      <button onClick={insertTableFromDatabase} disabled={!selectedTable}>
        Insertar tabla desde la base de datos
      </button>
    </div>
  );
};

export default TableCreator;
