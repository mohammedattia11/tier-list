import type { DraggableTypes } from "@/types";
import type { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

type handleDragEndTypes = {
  e: DragEndEvent;
  setDraggables: React.Dispatch<React.SetStateAction<DraggableTypes[]>>;
  setActiveDraggable: React.Dispatch<
    React.SetStateAction<DraggableTypes | undefined>
  >;
};

export const handleDragEnd = ({
  e,
  setDraggables,
  setActiveDraggable,
}: handleDragEndTypes) => {
  // draggable didn't touch the drop zone
  if (!e.over) return setActiveDraggable(undefined);
  const overId = e.over.id as string;
  const activeDraggableId = e.active.id as string;

  setDraggables((prev) => {
    const oldIndex = prev.findIndex(
      (draggable) => draggable.id === activeDraggableId,
    );
    const newIndex = prev.findIndex((draggable) => draggable.id === overId);

    if (oldIndex === newIndex) return prev;

    return arrayMove(prev, oldIndex, newIndex);
  });

  setActiveDraggable(undefined);
};
