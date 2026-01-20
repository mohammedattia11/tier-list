import type { DraggableTypes } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import Draggable from "./draggable";

type DropZonePropsTypes = {
  draggables: DraggableTypes[];
};

function DropZone({ draggables }: DropZonePropsTypes) {
  const { setNodeRef, isOver } = useDroppable({ id: "drop-zone" });
  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };
  return (
    <div
      className="flex h-32 w-full gap-4 border border-white bg-gray-900"
      style={style}
      ref={setNodeRef}
    >
      {draggables
        .filter((draggable) => draggable.dropZone !== undefined)
        .map((draggable) => (
          <Draggable key={draggable.id} draggable={draggable} />
        ))}
    </div>
  );
}
export default DropZone;
