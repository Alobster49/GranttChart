import React from "react";
import { Task } from "gantt-task-react";
import { useDrag, useDrop } from "react-dnd";

const DRAG_TYPE = "TASK_ROW";

interface TaskTableProps {
  tasks: Task[];
  onReorder: (dragIndex: number, hoverIndex: number) => void;
  onClickEdit: (task: Task) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onReorder, onClickEdit }) => {
  // Sort tasks by displayOrder for consistent rendering
  const sortedTasks = [...tasks].sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0)
  );

  return (
    // Use table-layout: fixed to honor explicit widths
    // Updated to text-[20px] for a 20px font size
    <table
      className="border-collapse w-full text-[20px]"
      style={{ tableLayout: "fixed", width: "350px"}}
    >
      <thead>
        <tr>
          {/* Each column is 80px wide */}
          <th className="border p-2" style={{ width: "80px"  }}>
            Name
          </th>
          <th className="border p-2" style={{ width: "80px" }}>
            From
          </th>
          <th className="border p-2" style={{ width: "80px"}}>
            To
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedTasks.map((task, index) => (
          <DraggableTaskRow
            key={task.id}
            index={index}
            task={task}
            moveRow={onReorder}
            onClickEdit={() => onClickEdit(task)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;

// ---------- Draggable Row Component ----------
interface DraggableTaskRowProps {
  task: Task;
  index: number;
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  onClickEdit: () => void;
}

const DraggableTaskRow: React.FC<DraggableTaskRowProps> = ({
  task,
  index,
  moveRow,
  onClickEdit,
}) => {
  const ref = React.useRef<HTMLTableRowElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: DRAG_TYPE,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: DRAG_TYPE,
    hover(item: { index: number }) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveRow(dragIndex, hoverIndex);
      item.index = hoverIndex; // update the dragged item's index
    },
  });

  drag(drop(ref));

  const opacity = isDragging ? 0.3 : 1;

  // Format date range for display
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const fromText = task.start.toLocaleDateString(undefined, dateOptions);
  const toText = task.end.toLocaleDateString(undefined, dateOptions);

  return (
    <tr
      ref={ref}
      style={{ opacity, cursor: "move" }}
      onDoubleClick={onClickEdit}
      className="border-b"
    >
      <th className="border p-2 text-[20px]"  style={{ width: "80px",fontSize:"10px", height:"50px" }}>
        {task.name}
      </th>
      <td className="border p-2 text-[20px]" style={{ width: "80px" ,fontSize:"10px", height:"50px"}}>
        {fromText}
      </td>
      <td className="border p-2 text-[20px]" style={{ width: "80px" ,fontSize:"10px", height:"50px"}}>
        {toText}
      </td>
    </tr>
  );
};
