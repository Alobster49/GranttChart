// components/view-switcher.tsx

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
}) => {
  const getButtonClass = (viewMode: ViewMode) => {
    return viewMode === currentViewMode ? "Button ActiveButton" : "Button";
  };

  return (
    <div className="ViewContainer">
      {/* View Mode Buttons */}
      <button
        className={getButtonClass(ViewMode.Hour)}
        onClick={() => onViewModeChange(ViewMode.Hour)}
      >
        Hour
      </button>
      <button
        className={getButtonClass(ViewMode.Day)}
        onClick={() => onViewModeChange(ViewMode.Day)}
      >
        Day
      </button>
      <button
        className={getButtonClass(ViewMode.Week)}
        onClick={() => onViewModeChange(ViewMode.Week)}
      >
        Week
      </button>
      <button
        className={getButtonClass(ViewMode.Month)}
        onClick={() => onViewModeChange(ViewMode.Month)}
      >
        Month
      </button>
      <button
        className={getButtonClass(ViewMode.Year)}
        onClick={() => onViewModeChange(ViewMode.Year)}
      >
        Year
      </button>

      {/* Undo and Redo Buttons */}
      <button className="Button" onClick={onUndo} disabled={undoDisabled}>
        Undo
      </button>
      <button className="Button" onClick={onRedo} disabled={redoDisabled}>
        Redo
      </button>

      {/* Expand All and Collapse All Buttons */}
      <button className="Button" onClick={onExpandAll}>
        Expand All
      </button>
      <button className="Button" onClick={onCollapseAll}>
        Collapse All
      </button>

      {/* Toggle Task List */}
      <label className="Switch">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => onViewListChange(e.target.checked)}
        />
        <span className="Slider" />
      </label>
    </div>
  );
};