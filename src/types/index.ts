import type { DragOverEvent, DragStartEvent } from "@dnd-kit/core";

export type DraggableTypes = {
  id: string;
  src: string;
};

export type handleDragStartTypes = {
  e: DragStartEvent;
  draggables: DraggableTypes[];
  setActiveDraggable: React.Dispatch<
    React.SetStateAction<DraggableTypes | undefined>
  >;
};

export type handleDragOverTypes = {
  e: DragOverEvent;
  setDropzones: React.Dispatch<React.SetStateAction<DropzoneType[]>>;
  dropzones: DropzoneType[]
  activeDraggable: DraggableTypes | undefined;
};

export type DropzoneType = {
  id: string;
  draggables: string[];
};
