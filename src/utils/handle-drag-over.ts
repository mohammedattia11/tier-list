import type { handleDragOverTypes } from "@/types";
import { arrayMove } from "@dnd-kit/sortable";
import { dropzoneIds } from "@/data/default-drop-zones";
export function handleDragOver({
  e,
  setDropzones,
  dropzones,
  activeDraggable,
}: handleDragOverTypes) {
  // draggable didn't touch the drop zone

  if (!e.over || !activeDraggable) return;
  
  const overId = e.over.id as string;
  const activeDraggableId = e.active.id;

  setDropzones((prev) => {
    const currentDropzone = dropzones.find((dz) =>
      dz.draggables.some((d) => d === activeDraggableId),
    );
    if (!currentDropzone) return;
    const currentDropzoneId = currentDropzone.id;

    // Case #1: if we're hovering the empty space in drop zone
    if (dropzoneIds.includes(overId)) {
      const dropzone = prev.find((dz) => dz.id === overId)!;
      const newDraggables = [
        ...dropzone.draggables.filter((d) => d !== activeDraggableId),
        activeDraggableId,
      ];

      return prev.map((dz) => {
        if (dz.id !== overId && dz.id !== currentDropzoneId) return dz;

        if (dz.id === currentDropzoneId && currentDropzoneId !== overId)
          return {
            ...dz,
            draggables: dz.draggables.filter((d) => d !== activeDraggableId),
          };

        return { ...dz, draggables: newDraggables };
      });
    }
    // Case #2: Rearranging items in the same row
    if (currentDropzone.draggables.some((d) => d === overId)) {
      const oldIndex = currentDropzone?.draggables.findIndex(
        (draggable) => draggable === activeDraggableId,
      );
      const newIndex = currentDropzone?.draggables.findIndex(
        (draggable) => draggable === overId,
      );

      if (oldIndex === newIndex) return prev;

      const newDraggables = arrayMove(
        currentDropzone?.draggables,
        oldIndex,
        newIndex,
      );

      return prev.map((dz) => {
        if (dz.id !== currentDropzoneId) return dz;
        return { ...dz, draggables: newDraggables };
      });
    }
    // Case #3: if we re-arranging between 2 diffrenet rows
    return prev;
  });
}
