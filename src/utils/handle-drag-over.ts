import type { handleDragOverTypes } from "@/types";
import { arrayMove } from "@dnd-kit/sortable";

export function handleDragOver({
  e,
  setDraggables,
  activeDraggable,
}: handleDragOverTypes) {
  // draggable didn't touch the drop zone
  if (!e.over || !activeDraggable) return;
  const overId = e.over.id as string;
  const activeDraggableId = e.active.id as string;
  setDraggables((prev) => {
    // if we're hovering the empty space in drop zone
    if (overId === "drop-zone") {
      const newDraggable = { ...activeDraggable, dropZone: "drop-zone" };
      return [
        ...prev.filter((draggable) => draggable.id !== activeDraggableId),
        newDraggable,
      ];
    }
    // if we're hovering the space inside Sortable context
    const overDraggable = prev.find((draggable) => draggable.id === overId);
    const overDropZone = !!overDraggable?.dropZone;
    const oldIndex = prev.findIndex(
      (draggable) => draggable.id === activeDraggableId,
    );
    const newIndex = prev.findIndex((draggable) => draggable.id === overId);

    if (oldIndex === newIndex) return prev;

    const shiftedItems = arrayMove(prev, oldIndex, newIndex);
    shiftedItems[newIndex] = {
      ...shiftedItems[newIndex],
      dropZone: overDropZone ? "drop-zone" : undefined,
    };

    return shiftedItems;
  });
}
