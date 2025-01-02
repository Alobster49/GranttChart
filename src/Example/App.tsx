"use client";

import React, { useState, useRef } from "react";
import { Task, ViewMode, Gantt } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { getStartEndDateForProject, initTasks } from "./helper";
import { ViewSwitcher } from "./components/view-switcher";
import "./index.css";
import TaskModal from "./components/task-modal";

const App = () => {
  const [view, setView] = useState<ViewMode>(ViewMode.Day);
  const [tasks, setTasks] = useState<Task[]>(initTasks());
  const [undoStack, setUndoStack] = useState<Task[][]>([]);
  const [redoStack, setRedoStack] = useState<Task[][]>([]);
  const [isChecked, setIsChecked] = useState(true);

  // For TaskModal usage
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Gantt container ref
  const ganttRef = useRef<HTMLDivElement>(null);

  // Dynamically adjust column width
  let columnWidth = 70;
  if (view === ViewMode.Year) columnWidth = 350;
  else if (view === ViewMode.Month) columnWidth = 300;
  else if (view === ViewMode.Week) columnWidth = 250;

  // ---------- Scroll Arrows ----------
  const scrollLeft = () => {
    if (ganttRef.current) {
      ganttRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (ganttRef.current) {
      ganttRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  // ---------- Stack Management (Undo/Redo) ----------
  const pushToUndoStack = (currentTasks: Task[]) => {
    setUndoStack((prev) => [...prev, currentTasks]);
    setRedoStack([]);
  };

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

  // ---------- Add, Edit, Delete ----------
  const handleAddTaskClick = () => {
    setIsEditMode(false);
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleCreateOrUpdateTask = (newTask: Task) => {
    pushToUndoStack(tasks);

    if (!isEditMode) {
      // Creating a new task
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } else {
      // Editing existing task
      setTasks((prevTasks) => {
        const index = prevTasks.findIndex((t) => t.id === newTask.id);
        if (index === -1) return prevTasks;
        const updated = [...prevTasks];
        updated[index] = { ...newTask };
        return updated;
      });
    }
  };

  // New: We still keep handleEditTask for double-click events if needed
  const handleEditTask = (task: Task) => {
    setIsEditMode(true);
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleTaskDelete = (task: Task) => {
    const conf = window.confirm("Are you sure about deleting " + task.name + "?");
    if (conf) {
      pushToUndoStack(tasks);
      setTasks(tasks.filter((t) => t.id !== task.id));
    }
    return conf;
  };

  // ---------- Gantt Events ----------
  const handleTaskChange = (task: Task) => {
    pushToUndoStack(tasks);
    const oldTask = tasks.find((t) => t.id === task.id);
    if (!oldTask) return;

    let newTasks = tasks.map((t) => (t.id === task.id ? task : t));

    // If it's a project, shift its children
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
      }
    }

    setTasks(newTasks);
  };

  const handleProgressChange = async (task: Task) => {
    pushToUndoStack(tasks);
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  // Optional: still keep double-click if you want
  const handleDblClick = (task: Task) => {
    console.log("Double clicked:", task.name);
    // or you can open the edit here, too
    // handleEditTask(task);
  };

  // ---------- Updated handleClick to open Edit Modal ----------
  const handleClick = (task: Task) => {
    // Instead of console.log, open edit modal right away:
    setIsEditMode(true);
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleSelect = (task: Task, isSelected: boolean) => {
    console.log(
      task.name + " has " + (isSelected ? "been selected" : "been unselected")
    );
  };

  const handleExpanderClick = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  // ---------- Expand/Collapse ----------
  const handleExpandAll = () => {
    const newTasks = tasks.map((task) =>
      task.type === "project" ? { ...task, hideChildren: false } : task
    );
    setTasks(newTasks);
  };

  const handleCollapseAll = () => {
    const newTasks = tasks.map((task) =>
      task.type === "project" ? { ...task, hideChildren: true } : task
    );
    setTasks(newTasks);
  };

  // ---------- Adjust Dependent Tasks ----------
  const adjustDependentTasks = (
    updatedTask: Task,
    tasksArr: Task[]
  ): Task[] => {
    let newTasks = [...tasksArr];
    const dependentTasks = tasksArr.filter(
      (t) => t.dependencies && t.dependencies.includes(updatedTask.id)
    );

    dependentTasks.forEach((depTask) => {
      const duration = depTask.end.getTime() - depTask.start.getTime();
      const newStart = new Date(updatedTask.end.getTime() + 1);
      const newEnd = new Date(newStart.getTime() + duration);

      const updatedDepTask = {
        ...depTask,
        start: newStart,
        end: newEnd,
      };

      newTasks = newTasks.map((t) =>
        t.id === updatedDepTask.id ? updatedDepTask : t
      );

      // Recursively update further dependents
      newTasks = adjustDependentTasks(updatedDepTask, newTasks);
    });

    return newTasks;
  };

  // ---------- Render ----------
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
        scrollLeft={scrollLeft}
        scrollRight={scrollRight}
        onAddTask={handleAddTaskClick}
      />

      <h3 className="text-6xl font-bold text-center my-4">T-nex Gantt Chart</h3>

      <div ref={ganttRef} className="gantt-container overflow-x-auto">
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

      {/* Task Modal */}
      {showModal && (
        <TaskModal
  isEditMode={isEditMode}
  existingTask={selectedTask}
  onClose={() => setShowModal(false)}
  onSave={(task) => {
    handleCreateOrUpdateTask(task);
    setShowModal(false);
  }}
  onDelete={(task) => {
    // Use the same logic you already have to delete the task
    handleTaskDelete(task);
    setShowModal(false);
  }}
  tasks={tasks}
/>
      )}
    </div>
  );
};

export default App;
