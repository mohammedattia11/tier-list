import Draggable from "@/components/draggable";
import DropZone from "@/components/drop-zone";
import { DndContext } from "@dnd-kit/core";
import { useState } from "react";

type DraggableTypes = {
  id: string;
  src: string;
};

const DefaultDraggables: DraggableTypes[] = [
  { id: crypto.randomUUID(), src: "bomber-card.png" },
  { id: crypto.randomUUID(), src: "executioner-card.png" },
  { id: crypto.randomUUID(), src: "goblin-barrel.png" },
  { id: crypto.randomUUID(), src: "ice-spirit-card.png" },
  { id: crypto.randomUUID(), src: "royal-hogs-card.png" },
  { id: crypto.randomUUID(), src: "valkyrie-card.png" },
  { id: crypto.randomUUID(), src: "wall-breakers-card.png" },
  { id: crypto.randomUUID(), src: "witch-card.png" },
  { id: crypto.randomUUID(), src: "zap-card.png" },
];

function App() {
  const [draggables, setDraggables] =
    useState<DraggableTypes[]>(DefaultDraggables);
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-16">
      <DndContext>
        <DropZone />
        <div className="flex gap-2">
          {draggables.map((draggable) => (
            <Draggable key={draggable.id} draggable={draggable} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

export default App;
