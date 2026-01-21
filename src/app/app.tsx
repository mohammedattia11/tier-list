import Draggable from "@/components/draggable";
import DropZone from "@/components/drop-zone";
import type { DraggableTypes } from "@/types";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";

// drop zone used to attach each object to specefic drop zone and if it undfined means it hasn't attached to any available drop zone
const DefaultDraggables: DraggableTypes[] = [
  { id: crypto.randomUUID(), src: "bomber-card.png", dropZone: undefined },
  { id: crypto.randomUUID(), src: "executioner-card.png", dropZone: undefined },
  { id: crypto.randomUUID(), src: "goblin-barrel.png", dropZone: undefined },
  { id: crypto.randomUUID(), src: "ice-spirit-card.png", dropZone: undefined },
  { id: crypto.randomUUID(), src: "royal-hogs-card.png", dropZone: undefined },
  { id: crypto.randomUUID(), src: "valkyrie-card.png", dropZone: undefined },
  {
    id: crypto.randomUUID(),
    src: "wall-breakers-card.png",
    dropZone: undefined,
  },
  { id: crypto.randomUUID(), src: "witch-card.png", dropZone: undefined },
  { id: crypto.randomUUID(), src: "zap-card.png", dropZone: undefined },
];

function App() {
  const [draggables, setDraggables] =
    useState<DraggableTypes[]>(DefaultDraggables);

  const handleDragEnd = (e: DragEndEvent) => {
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
  };
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-16">
      <DndContext onDragEnd={handleDragEnd}>
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
      </DndContext>
    </div>
  );
}

export default App;
