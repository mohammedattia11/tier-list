import { activeDraggableAtom } from "@/atoms/active-draggable-atom";
import DraggableContent from "@/components/draggable-content";
import DropZone from "@/components/drop-zone";
import { handleDragStart } from "@/utils/handle-drag-start";
import { DefaultDraggables } from "@/data/default-draggables";
import type { DraggableTypes } from "@/types";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useAtom } from "jotai";
import { useState } from "react";
import { handleDragOver } from "@/utils/handle-drag-over";
import Draggable from "@/components/draggable";
import { SortableContext } from "@dnd-kit/sortable";

// drop zone used to attach each object to specefic drop zone and if it undfined means it hasn't attached to any available drop zone

function App() {
  const [draggables, setDraggables] =
    useState<DraggableTypes[]>(DefaultDraggables);
  const [activeDraggable, setActiveDraggable] = useAtom(activeDraggableAtom);

  const freeDraggables = draggables.filter((draggable) => !draggable.dropZone);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-16">
      <DndContext
        onDragStart={(e) =>
          handleDragStart({ e, draggables, setActiveDraggable })
        }
        onDragEnd={() => setActiveDraggable(undefined)}
        onDragOver={(e) => handleDragOver({ e, setDraggables,activeDraggable })}
      >
        <DropZone draggables={draggables} />
        <SortableContext
          items={freeDraggables.map((draggable) => draggable.id)}
        >
          <div className="flex gap-2">
            {/*
              - first filter applied to get the objects that hasn't been attached to any drop zone "undefined"
              - then map over them to be displayed in the free zone
              */}
            {freeDraggables.map((draggable) => (
              <Draggable key={draggable.id} draggable={draggable} />
            ))}
          </div>
        </SortableContext>
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
