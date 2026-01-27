import type { DropzoneType } from "@/types";
import { useDroppable } from "@dnd-kit/core";
import Draggable from "./draggable";
import { SortableContext } from "@dnd-kit/sortable";
import { DefaultDraggables } from "@/data/default-draggables";

const dropZoneColorMap = {
  S: "rgb(255, 127, 127)",
  A: "rgb(255, 199, 127)",
  B: "rgb(191, 255, 127)",
  C: "rgb(127, 255, 127)"
}

function DropZone({ dropzone }: { dropzone: DropzoneType }) {
  const { id, draggables } = dropzone;
  const { setNodeRef } = useDroppable({ id });

  const backgroundColor = dropZoneColorMap[id as keyof typeof dropZoneColorMap];
  
  return (
    <div className="flex h-32 w-full gap-4 border border-white bg-zinc-700">
      <div className="w-30 flex justify-center items-center text-4xl font-semibold" style={{backgroundColor}}>
        {id}
      </div>
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
export default DropZone;
