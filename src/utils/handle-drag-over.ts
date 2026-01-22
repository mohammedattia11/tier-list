import type { handleDragOverTypes } from "@/types";
import { arrayMove } from "@dnd-kit/sortable";

export function handleDragOver({
  e,
  setDraggables,
  activeDraggable,
}: handleDragOverTypes) {
  // draggable didn't touch the drop zone

  if (!e.over || !activeDraggable) return;
  console.log(e);
  const overId = e.over.id;
  const activeDraggableId = e.active.id;

  setDraggables((prev) => {
    // if we're hovering the empty space in drop zone
    if (overId === "drop-zone") {
      // Check if the draggable already has the correct dropZone to avoid unnecessary updates
      const currentDraggable = prev.find(
        (draggable) => draggable.id === activeDraggableId,
      );
      if (currentDraggable?.dropZone === "drop-zone") {
        return prev;
      }
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

    if (oldIndex === newIndex) {
      // Check if dropZone needs to change
      const currentDraggable = prev[oldIndex];
      const targetDropZone = overDropZone ? "drop-zone" : undefined;
      if (currentDraggable?.dropZone === targetDropZone) {
        return prev;
      }
      // If dropZone needs to change but position doesn't, update only the dropZone
      const updated = [...prev];
      updated[oldIndex] = {
        ...updated[oldIndex],
        dropZone: targetDropZone,
      };
      return updated;
    }

    const shiftedItems = arrayMove(prev, oldIndex, newIndex);
    shiftedItems[newIndex] = {
      ...shiftedItems[newIndex],
      dropZone: overDropZone ? "drop-zone" : undefined,
    };

    return shiftedItems;
  });
}
