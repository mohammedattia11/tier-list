import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";

export type DraggableTypes = {
  id: string;
  src: string;
  dropZone?: string;
};

export type handleDragStartTypes = {
  e: DragStartEvent;
  draggables: DraggableTypes[];
  setActiveDraggable: React.Dispatch<
    React.SetStateAction<DraggableTypes | undefined>
  >;
};

export type handleDragEndTypes = {
  e: DragEndEvent;
  setDraggables: React.Dispatch<React.SetStateAction<DraggableTypes[]>>;
  setActiveDraggable: React.Dispatch<
    React.SetStateAction<DraggableTypes | undefined>
  >;
};
