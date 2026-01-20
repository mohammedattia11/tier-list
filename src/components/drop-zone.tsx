import { useDroppable } from "@dnd-kit/core";

function DropZone() {
  const { setNodeRef, isOver } = useDroppable({ id: "drop-zone" });
  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };
  return (
    <div
      className="h-30 w-full border border-white bg-gray-900"
      style={style}
      ref={setNodeRef}
    />
  );
}
export default DropZone;
