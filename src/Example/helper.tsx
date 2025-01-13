import { Task } from "gantt-task-react";

export function initTasks(): Task[] {
  const currentDate = new Date();

  // Example tasks with displayOrder
  const baseTasks: Task[] = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Some Project",
      id: "ProjectSample",
      progress: 25,
      type: "project",
      hideChildren: false,
      displayOrder: 1,
      styles: {
        backgroundColor: "#ffffff",
        backgroundSelectedColor: "#ffffff",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2, 12, 28),
      name: "Idea",
      id: "Task0",
      progress: 100,
      type: "task",
      project: "ProjectSample",
      displayOrder: 2,
      styles: {
        backgroundColor: "#2080690D",
        backgroundSelectedColor: "#2080690D",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      name: "Research",
      id: "Task1",
      progress: 80,
      dependencies: ["Task0"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 3,
      styles: {
        backgroundColor: "#2080690D",
        backgroundSelectedColor: "#2080690D",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      name: "Discussion with team",
      id: "Task2",
      progress: 10,
      dependencies: ["Task1"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 4,
      styles: {
        backgroundColor: "#2080690D",
        backgroundSelectedColor: "#2080690D",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 9),
      name: "Developing",
      id: "Task3",
      progress: 2,
      dependencies: ["Task2"],
      type: "task",
      project: "ProjectSample",
      displayOrder: 5,
      styles: {
        backgroundColor: "#2080690D",
        backgroundSelectedColor: "#2080690D",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 10),
      name: "Review",
      id: "Task4",
      type: "task",
      progress: 70,
      dependencies: ["Task2"],
      project: "ProjectSample",
      displayOrder: 6,
      styles: {
        backgroundColor: "#2080690D",
        backgroundSelectedColor: "#2080690D",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
      name: "Release",
      id: "Task6",
      progress: 50,
      type: "milestone",
      dependencies: ["Task4"],
      project: "ProjectSample",
      displayOrder: 7,
      styles: {
        backgroundColor: "#2080690D",
        backgroundSelectedColor: "#2080690D",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
    // Another project
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 16),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 30),
      name: "Another Project",
      id: "ProjectSample2",
      progress: 0,
      type: "project",
      hideChildren: false,
      displayOrder: 8,
      styles: {
        backgroundColor: "#ffffff",
        backgroundSelectedColor: "#ffffff",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 16),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      name: "Planning",
      id: "Task7",
      progress: 0,
      type: "task",
      project: "ProjectSample2",
      displayOrder: 9,
      styles: {
        backgroundColor: "#2080690D",
        backgroundSelectedColor: "#2080690D",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 22),
      name: "Execution",
      id: "Task8",
      progress: 0,
      dependencies: ["Task7"],
      type: "task",
      project: "ProjectSample2",
      displayOrder: 10,
      styles: {
        backgroundColor: "#2080690D",
        backgroundSelectedColor: "#2080690D",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 22),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 24),
      name: "Testing",
      id: "Task9",
      progress: 0,
      dependencies: ["Task8"],
      type: "task",
      project: "ProjectSample2",
      displayOrder: 11,
      styles: {
        backgroundColor: "#2080690D",
        backgroundSelectedColor: "#2080690D",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 24),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
      name: "Deployment",
      id: "Task10",
      progress: 0,
      dependencies: ["Task9"],
      type: "task",
      project: "ProjectSample2",
      displayOrder: 12,
      styles: {
        backgroundColor: "#2080690D",
        backgroundSelectedColor: "#2080690D",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
      name: "Project Completion",
      id: "Task11",
      progress: 0,
      type: "milestone",
      dependencies: ["Task10"],
      project: "ProjectSample2",
      displayOrder: 13,
      styles: {
        backgroundColor: "#2080690D",
        backgroundSelectedColor: "#2080690D",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
    // Independent Task
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 28),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 29),
      name: "Independent Task",
      id: "Task12",
      progress: 0,
      type: "task",
      displayOrder: 14,
      styles: {
        backgroundColor: "#2080690D",
        backgroundSelectedColor: "#2080690D",
        progressColor: "#208069",
        progressSelectedColor: "#208069",
      },
    },
  ];

  // Override the existing styles with your new color design:
  // - Projects => #c0c0c0 background
  // - Non-project => #808080 background
  // - All => #208069 progress, black font
  const styledTasks = baseTasks.map((t) => {
    if (t.type === "project") {
      return {
        ...t,
        styles: {
          backgroundColor: "#c0c0c0",
          backgroundSelectedColor: "#c0c0c0",
          progressColor: "#208069",
          progressSelectedColor: "#208069",
          fontColor: "black",
        },
      };
    } else {
      return {
        ...t,
        styles: {
          backgroundColor: "#808080",
          backgroundSelectedColor: "#808080",
          progressColor: "#208069",
          progressSelectedColor: "#208069",
          fontColor: "black",
        },
      };
    }
  });

  return styledTasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter((t) => t.project === projectId);

  if (projectTasks.length === 0) {
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
