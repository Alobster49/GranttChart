import React from "react";
import { ViewMode } from "gantt-task-react";

interface ViewSwitcherProps {
  onViewModeChange: (viewMode: ViewMode) => void;
  onViewListChange: (isChecked: boolean) => void;
  isChecked: boolean;
  currentViewMode: ViewMode;
  onUndo: () => void;
  onRedo: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
  undoDisabled: boolean;
  redoDisabled: boolean;
  scrollLeft: () => void;
  scrollRight: () => void;
  onAddTask: () => void;
}

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
  currentViewMode,
  onUndo,
  onRedo,
  onExpandAll,
  onCollapseAll,
  undoDisabled,
  redoDisabled,
  scrollLeft,
  scrollRight,
  onAddTask,
}) => {
  const viewModes = [
    ViewMode.Hour,
    ViewMode.Day,
    ViewMode.Week,
    ViewMode.Month,
    ViewMode.Year,
  ];

  const currentIndex = viewModes.indexOf(currentViewMode);

  const handleZoomIn = () => {
    if (currentIndex < viewModes.length - 1) {
      onViewModeChange(viewModes[currentIndex + 1]);
    }
  };

  const handleZoomOut = () => {
    if (currentIndex > 0) {
      onViewModeChange(viewModes[currentIndex - 1]);
    }
  };

  return (
    <div className="ViewContainer mb-2">
      <button className="Button" onClick={scrollLeft} aria-label="Scroll Left">
        ←
      </button>
      <button className="Button" onClick={scrollRight} aria-label="Scroll Right">
        →
      </button>

      <button
        className="Button"
        onClick={handleZoomOut}
        disabled={currentIndex <= 0}
        aria-label="Zoom Out"
      >
        -
      </button>

      <span className="CurrentViewModeLabel mx-2">{currentViewMode}</span>

      <button
        className="Button"
        onClick={handleZoomIn}
        disabled={currentIndex >= viewModes.length - 1}
        aria-label="Zoom In"
      >
        +
      </button>

      <button className="Button" onClick={onUndo} disabled={undoDisabled}>
        Undo
      </button>
      <button className="Button" onClick={onRedo} disabled={redoDisabled}>
        Redo
      </button>

      <button className="Button" onClick={onExpandAll}>
        ↓
      </button>
      <button className="Button" onClick={onCollapseAll}>
        ↑
      </button>

      <label className="Switch ml-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onViewListChange(e.target.checked)}
        />
        <span className="Slider" />
      </label>

      <button className="Button ml-4" onClick={onAddTask}>
        Add Task
      </button>
    </div>
  );
};
