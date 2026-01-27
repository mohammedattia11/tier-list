import type { DropzoneType } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import Draggable from "./draggable";
import { SortableContext } from "@dnd-kit/sortable";
import { DefaultDraggables } from "@/data/default-draggables";

function DropZone({ dropzone }: { dropzone: DropzoneType }) {
  const { id, draggables } = dropzone;
  const { setNodeRef, isOver } = useDroppable({ id });
  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };

  return (
    <div
      className="flex h-32 w-full gap-4 border border-white bg-gray-900"
      style={style}
      ref={setNodeRef}
    >
      <SortableContext items={draggables}>
        {draggables.map((draggableId) => {
          const draggable = DefaultDraggables.find((d) => d.id === draggableId);
          if (!draggable) return null;
          return <Draggable key={draggableId} draggable={draggable} />;
        })}
      </SortableContext>
    </div>
  );
}
export default DropZone;
