import React from "react";

const CustomTaskListHeader: React.FC = () => {
  return (
    <div className="task-list-header">
      <div className="task-list-header-item">Name</div>
      <div className="task-list-header-item">Start Date</div>
      <div className="task-list-header-item">End Date</div>
    </div>
  );
};

export default CustomTaskListHeader;
