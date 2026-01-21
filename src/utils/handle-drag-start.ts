import type { DraggableTypes } from "@/types";
import type { DragStartEvent } from "@dnd-kit/core";

type handleDragStartTypes = {
  e: DragStartEvent;
  draggables: DraggableTypes[];
  setActiveDraggable: React.Dispatch<
    React.SetStateAction<DraggableTypes | undefined>
  >;
};

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
