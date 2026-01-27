import type { DropzoneType } from "@/types";
import { DefaultDraggables } from "./default-draggables";

export const defaultDropzones: DropzoneType[] = [
  { id: "S", draggables: [] },
  { id: "A", draggables: [] },
  { id: "B", draggables: [] },
  { id: "C", draggables: [] },
  { id: "free", draggables: DefaultDraggables.map((d) => d.id) },
];

export const dropzoneIds = defaultDropzones.map((dz) => dz.id);
