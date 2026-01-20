import type { DraggableTypes } from "@/types";
import { useDraggable } from "@dnd-kit/core";

type DraggablePropsTypes = {
  draggable: DraggableTypes;
};

function Draggable({ draggable }: DraggablePropsTypes) {
  const { id, src } = draggable;
  const { setNodeRef, listeners, attributes, transform } = useDraggable({ id });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px,${transform.y}px,0)`
      : undefined,
  };
  return (
    <button
      className="cursor-pointer"
      style={style}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
    >
      <img
        src={`/src/assets/${src}`}
        alt={src}
        className="w-32 h-32 object-contain"
      />
    </button>
  );
}
export default Draggable;
