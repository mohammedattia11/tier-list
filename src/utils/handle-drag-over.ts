import type { handleDragOverTypes } from "@/types";
import { arrayMove } from "@dnd-kit/sortable";

export function handleDragOver({ e, setDraggables }: handleDragOverTypes) {
  // draggable didn't touch the drop zone
  if (!e.over) return;
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
}
