"use client";

import { DisplayOption, Gantt, Task, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import React, { useMemo, useState } from "react";

type TaskTypeItems = "task" | "milestone" | "project";

const Timeline = () => {
  // Stateful dataset for projects
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Project Alpha",
      startDate: "2023-10-01",
      endDate: "2023-12-31",
    },
    {
      id: 2,
      name: "Project Beta",
      startDate: "2023-11-15",
      endDate: "2024-02-15",
    },
    {
      id: 3,
      name: "Project Gamma",
      startDate: "2023-12-01",
      endDate: "2024-03-31",
    },
    {
      id: 4,
      name: "Project Delta",
      startDate: "2024-01-10",
      endDate: "2024-04-20",
    },
    {
      id: 5,
      name: "Project Epsilon",
      startDate: "2024-02-05",
      endDate: "2024-05-25",
    },
    {
      id: 6,
      name: "Project Zeta",
      startDate: "2024-03-15",
      endDate: "2024-06-15",
    },
    {
      id: 7,
      name: "Project Eta",
      startDate: "2024-04-01",
      endDate: "2024-07-31",
    },
    {
      id: 8,
      name: "Project Theta",
      startDate: "2024-05-20",
      endDate: "2024-08-20",
    },
    {
      id: 9,
      name: "Project Iota",
      startDate: "2024-06-10",
      endDate: "2024-09-30",
    },
    {
      id: 10,
      name: "Project Kappa",
      startDate: "2024-07-05",
      endDate: "2024-10-15",
    },
    // Add more projects as needed
  ]);

  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return projects.map((project) => ({
      start: new Date(project.startDate),
      end: new Date(project.endDate),
      name: project.name,
      id: `Project-${project.id}`,
      type: "project" as TaskTypeItems,
      progress: 50,
      isDisabled: false,
    }));
  }, [projects]);

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  // Handler to update project dates when a task's date is changed
  const handleDateChange = (task: Task) => {
    const projectId = parseInt(task.id.replace("Project-", ""), 10);
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? {
              ...project,
              startDate: task.start.toISOString().split("T")[0],
              endDate: task.end.toISOString().split("T")[0],
            }
          : project,
      ),
    );
  };

  return (
    <div className="max-w-full p-8">
      <header className="mb-4 flex items-center justify-between">
        <div className="relative inline-block w-64">
          <select
            className="focus:shadow-outline block w-full appearance-none rounded border border-gray-400 bg-white px-4 py-2 pr-8 leading-tight shadow hover:border-gray-500 focus:outline-none"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </header>

      <div className="overflow-hidden rounded-md bg-white shadow">
        <div className="timeline">
          <Gantt
            tasks={ganttTasks}
            {...displayOptions}
            columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
            listCellWidth="100px"
            projectBackgroundColor="#1f2937"
            projectProgressColor="#aeb8c2"
            projectProgressSelectedColor="#9ba1a6"
            onDateChange={handleDateChange} // Add this line
          />
        </div>
      </div>
    </div>
  );
};

export default Timeline;
