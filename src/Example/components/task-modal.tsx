import React, { useState, useEffect } from "react";
import { Task } from "gantt-task-react";

interface TaskModalProps {
  isEditMode: boolean;
  existingTask: Task | null;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete: (task: Task) => void; // <-- NEW PROP
  tasks: Task[];
}

const TaskModal: React.FC<TaskModalProps> = ({
  isEditMode,
  existingTask,
  onClose,
  onSave,
  onDelete, // <-- NEW PROP
  tasks,
}) => {
  const [name, setName] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [progress, setProgress] = useState(0);
  const [taskType, setTaskType] = useState<Task["type"]>("task");

  useEffect(() => {
    if (isEditMode && existingTask) {
      setName(existingTask.name);
      setStart(dateToInputValue(existingTask.start));
      setEnd(dateToInputValue(existingTask.end));
      setProgress(existingTask.progress ?? 0);
      setTaskType(existingTask.type);
    } else {
      // Default new task: 1-day duration
      const now = new Date();
      const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
      setName("");
      setStart(dateToInputValue(now));
      setEnd(dateToInputValue(tomorrow));
      setProgress(0);
      setTaskType("task");
    }
  }, [isEditMode, existingTask]);

  const dateToInputValue = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const inputValueToDate = (value: string) => {
    const [year, month, day] = value.split("-");
    return new Date(+year, +month - 1, +day);
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert("Task name is required.");
      return;
    }

    const startDate = inputValueToDate(start);
    const endDate = inputValueToDate(end);

    if (endDate < startDate) {
      alert("End date cannot be before start date.");
      return;
    }

    const newId = isEditMode && existingTask ? existingTask.id : generateNewId();

    const newTask: Task = {
      id: newId,
      type: taskType,
      ...(isEditMode && existingTask ? existingTask : {}),
      name,
      start: startDate,
      end: endDate,
      progress,
    };

    // Optional check for dependencies or overlaps
    if (hasOverlappingDependencies(newTask, tasks)) {
      alert("Task overlaps a dependency's time range. Please adjust dates.");
      return;
    }

    onSave(newTask);
  };

  const generateNewId = () => {
    return "Task_" + Math.floor(Math.random() * 100000);
  };

  const hasOverlappingDependencies = (task: Task, allTasks: Task[]): boolean => {
    return allTasks.some((t) => {
      if (t.dependencies && t.dependencies.includes(task.id)) {
        return task.end > t.start;
      }
      return false;
    });
  };

  const handleDeleteClick = () => {
    if (!existingTask) return;
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${existingTask.name}"?`
    );
    if (confirmDelete) {
      onDelete(existingTask);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Task" : "Add Task"}
        </h2>

        {/* Name Field */}
        <div className="mb-2">
          <label className="block font-semibold mb-1">Name</label>
          <input
            className="border rounded w-full p-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Task name"
          />
        </div>

        {/* Task Type Field */}
        <div className="mb-2">
          <label className="block font-semibold mb-1">Type</label>
          <select
            className="border rounded w-full p-1"
            value={taskType}
            onChange={(e) => setTaskType(e.target.value as Task["type"])}
          >
            <option value="task">Task</option>
            <option value="project">Project</option>
            <option value="milestone">Milestone</option>
          </select>
        </div>

        {/* Start Date Field */}
        <div className="mb-2">
          <label className="block font-semibold mb-1">Start Date</label>
          <input
            type="date"
            className="border rounded w-full p-1"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>

        {/* End Date Field */}
        <div className="mb-2">
          <label className="block font-semibold mb-1">End Date</label>
          <input
            type="date"
            className="border rounded w-full p-1"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />
        </div>

        {/* Progress Field */}
        <div className="mb-2">
          <label className="block font-semibold mb-1">Progress (%)</label>
          <input
            type="number"
            className="border rounded w-full p-1"
            value={progress}
            onChange={(e) => setProgress(+e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-4">
          {/* Delete button only in edit mode */}
          {isEditMode && (
            <button
              className="mr-auto px-4 py-2 bg-red-600 text-white rounded"
              onClick={handleDeleteClick}
            >
              Delete
            </button>
          )}

          <button
            className="mr-2 px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
