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
import Draggable from "@/components/draggable";
import { SortableContext } from "@dnd-kit/sortable";
import { defaultDropzones } from "@/data/default-drop-zones";

// drop zone used to attach each object to specefic drop zone and if it undfined means it hasn't attached to any available drop zone

function App() {
  const [draggables, setDraggables] =
    useState<DraggableTypes[]>(DefaultDraggables);
  const [activeDraggable, setActiveDraggable] = useAtom(activeDraggableAtom);
  const [dropzones, setDropzones] = useState<DropzoneType[]>(defaultDropzones);
  const freeDraggables = draggables.filter((draggable) => !draggable.dropZone);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-16">
      <DndContext
        onDragStart={(e) =>
          handleDragStart({ e, draggables, setActiveDraggable })
        }
        onDragEnd={() => setActiveDraggable(undefined)}
        onDragOver={(e) =>
          handleDragOver({ e, setDropzones, dropzones, activeDraggable })
        }
      >
        {dropzones.map((dz) => (
          <DropZone dropzone={dz} />
        ))}
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
