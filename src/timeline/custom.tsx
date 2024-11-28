// components/CustomTooltip.tsx

import React from "react";
import { Task } from "gantt-task-react";

interface CustomTooltipProps {
  task: Task;
  fontSize: string;
  fontFamily: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  task,
  fontSize,
  fontFamily,
}) => {
  return (
    <div
      className="custom-tooltip p-2 rounded-md border border-gray-200 shadow-sm"
      style={{ fontSize, fontFamily }}
    >
      <strong>{task.name}</strong>
      <p>
        {task.start.toLocaleDateString()} - {task.end.toLocaleDateString()}
      </p>
    </div>
  );
};

export default CustomTooltip;
