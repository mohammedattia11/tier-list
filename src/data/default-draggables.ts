import type { DraggableTypes } from "@/types";

export const DefaultDraggables: DraggableTypes[] = [
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