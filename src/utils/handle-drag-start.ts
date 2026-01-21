import type { DraggableTypes, handleDragStartTypes } from "@/types";

export const handleDragStart = ({
  e,
  draggables,
  setActiveDraggable,
}: handleDragStartTypes) => {
  const activeDraggable = draggables.find(
    (draggable) => draggable.id === e.active.id,
  ) as DraggableTypes;
  setActiveDraggable(activeDraggable);
};
