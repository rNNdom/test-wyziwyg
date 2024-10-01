// TableCard.tsx
import React, { useState } from "react";
import axios from "axios";

interface TableCardProps {
  title: string;
  columns: string[];
  data: any[];
  onAddRow: (newRow: any) => void; // Prop para manejar la adición de filas
  tableName: string; // Nombre de la tabla para enviarla al backend
}

const TableCard: React.FC<TableCardProps> = ({
  title,
  columns,
  data,
  onAddRow,
  tableName,
}) => {
  const [newRow, setNewRow] = useState<{ [key: string]: string }>({}); // Estado para almacenar los nuevos datos
  const [nextId, setNextId] = useState(data.length + 1); // Estado para el próximo ID

  const handleChange = (column: string, value: string) => {
    setNewRow((prev) => ({
      ...prev,
      [column]: value,
    }));
  };

  const handleAddRow = async () => {
    // Asegúrate de que todos los campos requeridos están llenos
    if (Object.values(newRow).some((value) => value === "")) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Agregar un ID único a la nueva fila
    const rowWithId = { id: nextId, ...newRow };

    // Enviar el nuevo dato al backend
    try {
      await axios.post(
        `http://localhost:3000/table/${tableName}/add`,
        rowWithId
      );
      onAddRow(rowWithId); // Llama a la función de agregar fila
      setNextId(nextId + 1); // Incrementar el ID para la próxima fila
      setNewRow({}); // Resetea el formulario
    } catch (error) {
      console.error("Error al agregar fila:", error);
    }
  };

  return (
    <div className="table-card">
      <div className="table-card-header">
        <h3>{title}</h3>
      </div>
      <div className="table-card-body">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((col) => (
                  <td key={col}>{row[col] || ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Formulario para agregar nueva fila */}
        <div>
          {columns.map((col) => (
            <input
              key={col}
              type="text"
              placeholder={col}
              value={newRow[col] || ""}
              onChange={(e) => handleChange(col, e.target.value)}
            />
          ))}
          <button onClick={handleAddRow}>Agregar Fila</button>
        </div>
      </div>
    </div>
  );
};

export default TableCard;
