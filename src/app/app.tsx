import { activeDraggableAtom } from "@/atoms/active-draggable-atom";
import DraggableContent from "@/components/draggable-content";
import DropZone from "@/components/drop-zone";
import { handleDragStart } from "@/utils/handle-drag-start";
import { DefaultDraggables } from "@/data/default-draggables";
import type { DraggableTypes } from "@/types";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { useState } from "react";
import { handleDragEnd } from "@/utils/handle-drag-end";

// drop zone used to attach each object to specefic drop zone and if it undfined means it hasn't attached to any available drop zone

function App() {
  const [draggables, setDraggables] =
    useState<DraggableTypes[]>(DefaultDraggables);
  const [activeDraggable, setActiveDraggable] = useAtom(activeDraggableAtom);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-16">
      <DndContext
        onDragStart={(e) =>
          handleDragStart({ e, draggables, setActiveDraggable })
        }
        onDragEnd={(e) =>
          handleDragEnd({ e, setDraggables, setActiveDraggable })
        }
      >
        <DropZone draggables={draggables} />
        {/*<div className="flex gap-2">*/}
        {/*
            - first filter applied to get the objects that hasn't been attached to any drop zone "undefined"
            - then map over them to be displayed in the free zone
            */}
        {/*{draggables
            .filter((draggable) => draggable.dropZone === undefined)
            .map((draggable) => (
              <Draggable key={draggable.id} draggable={draggable} />
            ))}
        </div>*/}
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
