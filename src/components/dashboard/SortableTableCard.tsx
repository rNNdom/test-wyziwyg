// SortableTableCard.tsx
import React, { ReactNode } from "react";
import { useSortable } from "@dnd-kit/sortable";

interface SortableTableCardProps {
  index: number; // El índice de la tarjeta
  children: ReactNode; // Contenido que se renderiza dentro de la tarjeta
}

const SortableTableCard: React.FC<SortableTableCardProps> = ({
  index,
  children,
}) => {
  const { setNodeRef, attributes, listeners } = useSortable({
    id: index.toString(),
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{ cursor: "grab" }}
    >
      {children}
    </div>
  );
};

export default SortableTableCard;
