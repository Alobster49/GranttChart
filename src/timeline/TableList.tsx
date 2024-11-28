import React from "react";
import { Task } from "gantt-task-react";

interface CustomTaskListTableProps {
  rowHeight: number;
  fontSize: string;
  tasks: Task[];
}

const CustomTaskListTable: React.FC<CustomTaskListTableProps> = ({
  tasks,
}) => {
  return (
    <div className="task-list-table">
      {tasks.map((task) => (
        <div className="task-list-row" key={task.id}>
          <div className="task-list-cell">{task.name}</div>
          <div className="task-list-cell">
            {task.start.toLocaleDateString()}
          </div>
          <div className="task-list-cell">
            {task.end.toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomTaskListTable;
