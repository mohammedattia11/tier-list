import type { handleDragOverTypes } from "@/types";
import { arrayMove } from "@dnd-kit/sortable";
import { throttle } from 'lodash';

function handleDragOverLogic({
  e,
  setDropzones,
  dropzones,
  activeDraggable,
  dropZonesIds 
}: handleDragOverTypes) {
  if (!e.over || !activeDraggable) return;

  const overId = e.over.id as string;
  const activeDraggableId = e.active.id as string;

  const currentDropzone = dropzones.find((dz) =>
    dz.draggables.some((d) => d === activeDraggableId),
  );
  if (!currentDropzone) return;
  const currentDropzoneId = currentDropzone.id;

  setDropzones((prev) => {
    // Case #1: if we're hovering the empty space in drop zone
    if (dropZonesIds .includes(overId)) {
      const dropzone = prev.find((dz) => dz.id === overId)!;
      const newDraggables = [
        ...dropzone.draggables.filter((d) => d !== activeDraggableId),
        activeDraggableId,
      ];

      return prev.map((dz) => {
        if (dz.id !== overId && dz.id !== currentDropzoneId) return dz;

        if (dz.id === currentDropzoneId && currentDropzoneId !== overId) {
          return {
            ...dz,
            draggables: dz.draggables.filter((d) => d !== activeDraggableId),
          };
        }

        return { ...dz, draggables: newDraggables };
      });
    }
    // Case #2: Rearranging items in the same row
    else if (currentDropzone.draggables.some((d) => d === overId)) {
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
    // Case #3: if we re-arranging between 2 different rows
    else if (!currentDropzone.draggables.some((d) => d === overId)) {
      const newDropzone = prev.find((dz) => // Use 'prev' here for latest state
        dz.draggables.some((d) => d === overId),
      );

      if (!newDropzone) return prev;

      const overIndex = newDropzone.draggables.findIndex((d) => d === overId);
      const newDraggables = newDropzone.draggables.toSpliced(
        overIndex,
        0,
        activeDraggableId
      );

      return prev.map((dz) => {
        if (dz.id !== currentDropzoneId && dz.id !== newDropzone.id) return dz;
        else if (dz.id === currentDropzoneId) {
          return {
            ...dz,
            draggables: dz.draggables.filter((d) => d !== activeDraggableId),
          };
        }
        return { ...dz, draggables: newDraggables }
      });
    }
    return prev;
  });
}

// 2. Export the throttled version
// 50ms-100ms is usually the "sweet spot" for drag operations
export const handleDragOver = throttle(handleDragOverLogic, 100);