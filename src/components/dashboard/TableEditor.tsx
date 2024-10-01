// TableEditor.tsx
import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TableCard from "./TableCard"; // Importa el componente de tarjeta de tabla
import TableCreator from "./TableCreator"; // Importa el componente de creación de tabla
import SortableTableCard from "./SortableTableCard"; // Importa el componente de ordenamiento
import "./tableEditor.css";

// Función para mover elementos en un array
const arrayMove = (array: any[], from: number, to: number) => {
  const item = array[from];
  const newArray = array.slice();
  newArray.splice(from, 1);
  newArray.splice(to, 0, item);
  return newArray;
};

const TableEditor: React.FC = () => {
  const [tableComponents, setTableComponents] = useState<any[]>([]); // Almacena las tablas como componentes

  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  if (!editor) {
    return null;
  }

  // Función que se ejecuta cuando se termina el drag
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    // Si no hay destino, no hacemos nada
    if (!over) return;

    // Obtener el índice de la tabla activa y la tabla sobre la que se está soltando
    const activeIndex = Number(active.id);
    const overIndex = Number(over.id);

    // Mover la tabla en la lista
    setTableComponents((items) => arrayMove(items, activeIndex, overIndex));
  };

  // Función que se llama desde TableCreator para agregar una nueva tabla
  const addTable = (
    title: string,
    columns: string[],
    data: any[],
    tableName: string
  ) => {
    setTableComponents((prev) => [
      ...prev,
      { title, columns, data, tableName }, // Almacena la tabla como un objeto con nombre
    ]);
  };

  // Función para agregar una nueva fila a la tabla
  const handleAddRow = (index: number, newRow: any) => {
    setTableComponents((prev) => {
      const updatedTable = [...prev];
      updatedTable[index].data.push(newRow); // Agregar la nueva fila a la tabla correspondiente
      return updatedTable;
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <TableCreator onTableCreated={addTable} />
      <SortableContext
        items={tableComponents.map((_, index) => index.toString())}
        strategy={verticalListSortingStrategy}
      >
        <div className="table-container">
          {tableComponents.map((tableComponent, index) => (
            <SortableTableCard key={index} index={index}>
              <TableCard
                title={tableComponent.title}
                columns={tableComponent.columns}
                data={tableComponent.data}
                onAddRow={(newRow) => handleAddRow(index, newRow)} // Pasar la función para agregar filas
                tableName={tableComponent.tableName} // Pasar el nombre de la tabla
              />
            </SortableTableCard>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};

export default TableEditor;
