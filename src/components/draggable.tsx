import type { DraggableTypes } from "@/types";
import { useSortable } from "@dnd-kit/sortable";

type DraggablePropsTypes = {
  draggable: DraggableTypes;
};

function Draggable({ draggable }: DraggablePropsTypes) {
  const { id, src } = draggable;
  const { setNodeRef, listeners, attributes, transform } = useSortable({ id });

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
        className="h-32 w-32 object-contain"
      />
    </button>
  );
}
export default Draggable;
