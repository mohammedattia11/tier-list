import type { DraggableTypes } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import Draggable from "./draggable";
import { SortableContext } from "@dnd-kit/sortable";

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
      <SortableContext items={draggables.map((draggable) => draggable.id)}>
        {draggables.filter(draggable => draggable.dropZone).map((draggable) => (
          <Draggable key={draggable.id} draggable={draggable} />
        ))}
      </SortableContext>
    </div>
  );
}
export default DropZone;
