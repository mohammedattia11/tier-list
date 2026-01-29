import { activeDraggableAtom } from "@/atoms/active-draggable-atom";
import DraggableContent from "@/components/draggable-content";
import DropZone from "@/components/drop-zone";
import { handleDragStart } from "@/utils/handle-drag-start";
import { DefaultDraggables } from "@/data/default-draggables";
import type { DraggableTypes, DropzoneType } from "@/types";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { useState } from "react";
import { handleDragOver } from "@/utils/handle-drag-over";
import { defaultDropzones } from "@/data/default-drop-zones";
import { Button } from "@/components/ui/button";
// drop zone used to attach each object to specefic drop zone and if it undfined means it hasn't attached to any available drop zone

function App() {
  const [draggables, setDraggables] =
    useState<DraggableTypes[]>(DefaultDraggables);
  const [activeDraggable, setActiveDraggable] = useAtom(activeDraggableAtom);
  const [dropzones, setDropzones] = useState<DropzoneType[]>(defaultDropzones);

  const freeDropZone = dropzones.find((dz) => dz.id === "free");
  const dropZonesIds = dropzones.map((dz) => dz.id);
  if (!freeDropZone) return null;

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-stone-800 p-4">
      <div className="flex w-full justify-end p-4 ">
        <Button
          className="bg-linear-to-br from-pink-500 to-pink-700 rounded-xl cursor-pointer hover:brightness-105 transition-colors"
          onClick={() => {
            setDropzones((prev) => [...prev, { id: "New", draggables: [] }]);
          }}
        >
          Add new Drop zone
        </Button>
      </div>
      <DndContext
        onDragStart={(e) =>
          handleDragStart({ e, draggables, setActiveDraggable })
        }
        onDragEnd={() => setActiveDraggable(undefined)}
        onDragOver={(e) =>
          handleDragOver({
            e,
            setDropzones,
            dropzones,
            activeDraggable,
            dropZonesIds,
          })
        }
      >
        {dropzones
          .filter((dz) => dz.id !== "free")
          .map((dz) => (
            <DropZone dropzone={dz} />
          ))}
        <DropZone dropzone={freeDropZone} />
        <DragOverlay>
          {activeDraggable && (
            <DraggableContent draggable={activeDraggable} isDragging />
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;
