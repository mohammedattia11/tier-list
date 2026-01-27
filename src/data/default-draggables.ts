import type { DraggableTypes } from "@/types";

export const DefaultDraggables: DraggableTypes[] = [
  { id: crypto.randomUUID(), src: "bomber-card.png" },
  {
    id: crypto.randomUUID(),
    src: "executioner-card.png",
  },
  { id: crypto.randomUUID(), src: "goblin-barrel.png" },
  {
    id: crypto.randomUUID(),
    src: "ice-spirit-card.png",
  },
  { id: crypto.randomUUID(), src: "royal-hogs-card.png" },
  { id: crypto.randomUUID(), src: "valkyrie-card.png" },
  {
    id: crypto.randomUUID(),
    src: "wall-breakers-card.png",
  },
  { id: crypto.randomUUID(), src: "witch-card.png" },
  { id: crypto.randomUUID(), src: "zap-card.png" },
];
