import type { DropzoneType } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import Draggable from "./draggable";
import { SortableContext } from "@dnd-kit/sortable";
import { DefaultDraggables } from "@/data/default-draggables";

function FreeArea({ dropzone }: { dropzone: DropzoneType }) {
  const { id, draggables } = dropzone;
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex h-32 w-full gap-4 border border-white bg-zinc-700">
      <div className="flex gap-4">
        <SortableContext items={draggables}>
          {draggables.map((draggableId) => {
            const draggable = DefaultDraggables.find(
              (d) => d.id === draggableId,
            );
            if (!draggable) return null;
            return <Draggable key={draggableId} draggable={draggable} />;
          })}
        </SortableContext>
      </div>
      <div className="flex-1" ref={setNodeRef} />
    </div>
  );
}
export default FreeArea;
