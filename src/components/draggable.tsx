import type { DraggableTypes } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import DraggableContent from "./draggable-content";

type DraggablePropsTypes = {
  draggable: DraggableTypes;
};

function Draggable({ draggable }: DraggablePropsTypes) {
  const { id } = draggable;
  const { setNodeRef, listeners, attributes, transform, transition } = useSortable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px,${transform.y}px,0)`
      : undefined,
      transition
  };
  return (
    <button
      className="cursor-pointer"
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <DraggableContent draggable={draggable} />
    </button>
  );
}
export default Draggable;
