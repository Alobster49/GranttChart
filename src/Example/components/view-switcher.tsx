import React from "react";
import { ViewMode } from "gantt-task-react";

type ViewSwitcherProps = {
  isChecked: boolean;
  currentViewMode: ViewMode;
  onViewListChange: (isChecked: boolean) => void;
  onViewModeChange: (viewMode: ViewMode) => void;
};

export const ViewSwitcher: React.FC<ViewSwitcherProps> = ({
  onViewModeChange,
  onViewListChange,
  isChecked,
  currentViewMode,
}) => {
  const getButtonClasses = (viewMode: ViewMode) => {
    const baseClasses =
      "px-4 py-2 m-1 border rounded focus:outline-none transition-colors duration-200";
    const activeClasses =
      "bg-blue-500 text-white border-blue-500 hover:bg-blue-600";
    const inactiveClasses =
      "bg-gray-200 text-black border-gray-300 hover:bg-gray-300";

    return viewMode === currentViewMode
      ? `${baseClasses} ${activeClasses}`
      : `${baseClasses} ${inactiveClasses}`;
  };

  return (
    <div className="flex flex-wrap items-center">
      <button
        className={getButtonClasses(ViewMode.Hour)}
        onClick={() => onViewModeChange(ViewMode.Hour)}
      >
        Hour
      </button>
      <button
        className={getButtonClasses(ViewMode.QuarterDay)}
        onClick={() => onViewModeChange(ViewMode.QuarterDay)}
      >
        Quarter of Day
      </button>
      <button
        className={getButtonClasses(ViewMode.HalfDay)}
        onClick={() => onViewModeChange(ViewMode.HalfDay)}
      >
        Half of Day
      </button>
      <button
        className={getButtonClasses(ViewMode.Day)}
        onClick={() => onViewModeChange(ViewMode.Day)}
      >
        Day
      </button>
      <button
        className={getButtonClasses(ViewMode.Week)}
        onClick={() => onViewModeChange(ViewMode.Week)}
      >
        Week
      </button>
      <button
        className={getButtonClasses(ViewMode.Month)}
        onClick={() => onViewModeChange(ViewMode.Month)}
      >
        Month
      </button>
      <button
        className={getButtonClasses(ViewMode.Year)}
        onClick={() => onViewModeChange(ViewMode.Year)}
      >
        Year
      </button>
      <div className="flex items-center ml-4">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="form-checkbox h-5 w-5"
            defaultChecked={isChecked}
            onClick={() => onViewListChange(!isChecked)}
          />
          <span className="ml-2 text-sm">Show Task List</span>
        </label>
      </div>
    </div>
  );
};
