import { activeDraggableAtom } from "@/atoms/active-draggable-atom";
import type { DraggableTypes } from "@/types";
import { useAtomValue } from "jotai";

type DraggablePropsTypes = {
  draggable: DraggableTypes;
  isDragging?: boolean;
};

function DraggableContent({ draggable, isDragging }: DraggablePropsTypes) {
  const { id, src } = draggable;
  const activeDraggableId = useAtomValue(activeDraggableAtom)?.id;
  return (
    <img
      src={`/src/assets/${src}`}
      alt={src}
      style={{
        opacity: isDragging || activeDraggableId !== id ? 1 : 0,
      }}
      className="max-h-32"
    />
  );
}
export default DraggableContent;
