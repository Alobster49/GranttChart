// App.tsx

"use client";

import React, { useState } from "react";
import { Task, ViewMode, Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { getStartEndDateForProject, initTasks } from "./helper";
import { ViewSwitcher } from "./components/view-switcher";
import "./index.css";

const App = () => {
  // State variables
  const [view, setView] = useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = useState<Task[]>(initTasks());
  const [undoStack, setUndoStack] = useState<Task[][]>([]);
  const [redoStack, setRedoStack] = useState<Task[][]>([]);
  const [isChecked, setIsChecked] = useState(true);

  // Adjust column width based on view mode
  let columnWidth = 70;
  if (view === ViewMode.Year) {
    columnWidth = 350;
  } else if (view === ViewMode.Month) {
    columnWidth = 300;
  } else if (view === ViewMode.Week) {
    columnWidth = 250;
  }

  // Function to push the current tasks to the undo stack
  const pushToUndoStack = (currentTasks: Task[]) => {
    setUndoStack((prev) => [...prev, currentTasks]);
    setRedoStack([]); // Clear redo stack
  };

  // Event handlers
  const handleTaskChange = (task: Task) => {
    pushToUndoStack(tasks);

    // Find the old task data
    const oldTask = tasks.find((t) => t.id === task.id);
    if (!oldTask) {
      console.error("Task not found:", task.id);
      return;
    }

    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));

    // If the task is a project, adjust its child tasks
    if (task.type === "project") {
      const diff = task.start.getTime() - oldTask.start.getTime();
      newTasks = newTasks.map((t) => {
        if (t.project === task.id) {
          return {
            ...t,
            start: new Date(t.start.getTime() + diff),
            end: new Date(t.end.getTime() + diff),
          };
        }
        return t;
      });
    }

    // Adjust dependent tasks
    newTasks = adjustDependentTasks(task, newTasks);

    // Adjust project dates if the task belongs to a project
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks.find((t) => t.id === task.project);
      if (project) {
        if (
          project.start.getTime() !== start.getTime() ||
          project.end.getTime() !== end.getTime()
        ) {
          const changedProject = { ...project, start, end };
          newTasks = newTasks.map((t) =>
            t.id === task.project ? changedProject : t
          );
        }
      } else {
        console.error("Project not found:", task.project);
      }
    }

    setTasks(newTasks);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about deleting " + task.name + "?");
    if (conf) {
      pushToUndoStack(tasks);
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
    return conf;
  };

  const handleProgressChange = async (task: Task) => {
    pushToUndoStack(tasks);
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  const handleDblClick = (task: Task) => {
    alert("On Double Click event Id:" + task.id);
  };

  const handleClick = (task: Task) => {
    console.log("On Click event Id:" + task.id);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(
      task.name + " has " + (isSelected ? "been selected" : "been unselected")
    );
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    console.log("On expander click Id:" + task.id);
  };

  // Undo and Redo functions
  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previousTasks = undoStack[undoStack.length - 1];
    setRedoStack([...redoStack, tasks]);
    setUndoStack(undoStack.slice(0, undoStack.length - 1));
    setTasks(previousTasks);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const nextTasks = redoStack[redoStack.length - 1];
    setUndoStack([...undoStack, tasks]);
    setRedoStack(redoStack.slice(0, redoStack.length - 1));
    setTasks(nextTasks);
  };

  // Expand All and Collapse All functions
  const handleExpandAll = () => {
    const newTasks = tasks.map((task) => {
      if (task.type === "project") {
        return { ...task, hideChildren: false };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleCollapseAll = () => {
    const newTasks = tasks.map((task) => {
      if (task.type === "project") {
        return { ...task, hideChildren: true };
      }
      return task;
    });
    setTasks(newTasks);
  };

  // Function to adjust dependent tasks recursively
  const adjustDependentTasks = (updatedTask: Task, tasks: Task[]): Task[] => {
    let newTasks = [...tasks];

    // Find tasks that depend on the updated task
    const dependentTasks = tasks.filter(
      (t) => t.dependencies && t.dependencies.includes(updatedTask.id)
    );

    dependentTasks.forEach((depTask) => {
      // Calculate the duration of the dependent task
      const duration = depTask.end.getTime() - depTask.start.getTime();

      // Set the new start date to be immediately after the updated task's end date
      const newStart = new Date(updatedTask.end.getTime() + 1);
      const newEnd = new Date(newStart.getTime() + duration);

      const updatedDepTask = {
        ...depTask,
        start: newStart,
        end: newEnd,
      };

      // Update the task in the tasks array
      newTasks = newTasks.map((t) =>
        t.id === updatedDepTask.id ? updatedDepTask : t
      );

      // Recursively adjust tasks that depend on this dependent task
      newTasks = adjustDependentTasks(updatedDepTask, newTasks);
    });

    return newTasks;
  };

  return (
    <div className="Wrapper">
      <ViewSwitcher
        onViewModeChange={(viewMode) => setView(viewMode)}
        onViewListChange={setIsChecked}
        isChecked={isChecked}
        currentViewMode={view}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onExpandAll={handleExpandAll}
        onCollapseAll={handleCollapseAll}
        undoDisabled={undoStack.length === 0}
        redoDisabled={redoStack.length === 0}
      />
      <h3 className="text-6xl font-bold text-center my-4">T-nex Gantt Chart</h3>
      <Gantt
        tasks={tasks}
        viewMode={view}
        onDateChange={handleTaskChange}
        onDelete={handleTaskDelete}
        onProgressChange={handleProgressChange}
        onDoubleClick={handleDblClick}
        onClick={handleClick}
        onSelect={handleSelect}
        onExpanderClick={handleExpanderClick}
        listCellWidth={isChecked ? "180px" : ""}
        columnWidth={columnWidth}
      />
    </div>
  );
};

export default App;