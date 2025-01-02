import { Task } from "gantt-task-react";

export function initTasks() {
  const currentDate = new Date();
  const tasks: Task[] = [
    // Existing ProjectSample
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Some Project",
      id: "ProjectSample",
      progress: 25,
      type: "project",
      hideChildren: false,
      displayOrder: 1,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        2,
        12,
        28
      ),
      name: "Idea",
      id: "Task 0",
      progress: 100,
      type: "task",
      project: "ProjectSample",
      displayOrder: 2,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4, 0, 0),
      name: "Research",
      id: "Task 1",
      progress: 80,
      dependencies: ["Task 0"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 3,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8, 0, 0),
      name: "Discussion with team",
      id: "Task 2",
      progress: 10,
      dependencies: ["Task 1"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 4,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9, 0, 0),
      name: "Developing",
      id: "Task 3",
      progress: 2,
      dependencies: ["Task 2"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 5,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Review",
      id: "Task 4",
      type: "task",
      progress: 70,
      dependencies: ["Task 2"],
      project: "ProjectSample",
      displayOrder: 6,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      id: "Task 6",
      progress: currentDate.getMonth(),
      type: "milestone",
      dependencies: ["Task 4"],
      project: "ProjectSample",
      displayOrder: 7,
    },
    // New ProjectSample2
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 16),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 30),
      name: "Another Project",
      id: "ProjectSample2",
      progress: 0,
      type: "project",
      hideChildren: false,
      displayOrder: 8,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 16),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      name: "Planning",
      id: "Task 7",
      progress: 0,
      type: "task",
      project: "ProjectSample2",
      displayOrder: 9,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 22),
      name: "Execution",
      id: "Task 8",
      progress: 0,
      dependencies: ["Task 7"],
      type: "task",
      project: "ProjectSample2",
      displayOrder: 10,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 22),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 24),
      name: "Testing",
      id: "Task 9",
      progress: 0,
      dependencies: ["Task 8"],
      type: "task",
      project: "ProjectSample2",
      displayOrder: 11,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 24),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
      name: "Deployment",
      id: "Task 10",
      progress: 0,
      dependencies: ["Task 9"],
      type: "task",
      project: "ProjectSample2",
      displayOrder: 12,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
      name: "Project Completion",
      id: "Task 11",
      progress: 0,
      type: "milestone",
      dependencies: ["Task 10"],
      project: "ProjectSample2",
      displayOrder: 13,
    },
    // Optionally, other tasks without projects
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 28),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 29),
      name: "Independent Task",
      id: "Task 12",
      progress: 0,
      type: "task",
      displayOrder: 14,
    },
  ];
  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter((t) => t.project === projectId);

  if (projectTasks.length === 0) {
    // No tasks in project, return current date for both start and end
    const now = new Date();
    return [now, now];
  }

  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 1; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (task.start && task.start.getTime() < start.getTime()) {
      start = task.start;
    }
    if (task.end && task.end.getTime() > end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
