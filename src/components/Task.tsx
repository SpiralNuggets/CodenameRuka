import React from "react";
import { FiFlag } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

interface TaskProps {
  title?: string | (() => string);
  dueDate?: Date;
  description?: string;
  isFailed?: boolean;
  isCompleted?: boolean;
  handleClick?: () => void;
  onFailedToggle?: (taskId: string, isFailed: boolean) => void;
  onCompletedToggle?: (taskId: string, isCompleted: boolean) => void;
  taskId: string; // Unique identifier for the task
}

const Task = ({
  title = () => "New Card",
  dueDate = new Date(),
  description = "",
  isFailed = false,
  isCompleted = false,
  handleClick = () => {},
  onFailedToggle = () => {},
  onCompletedToggle = () => {},
  taskId,
}: TaskProps) => {
  const handleFailedToggle = () => {
    onFailedToggle(taskId, !isFailed);
  };

  const handleCompletedToggle = () => {
    onCompletedToggle(taskId, !isCompleted);
  };

  return (
    <div
      className="bg-neutral-400 w-full h-auto rounded-lg border-2 border-[#c29b4a] p-2 flex flex-col gap-1 max-h-56 mb-2"
      onClick={handleClick}
    >
      <div className="bg-[#3a3d49] h-8 w-full rounded flex items-center p-2">
        <p className="text-white grow">{typeof title === 'function' ? title() : title}</p>
        <FiFlag className="text-[#c29b4a]" />
      </div>
      <div className="px-1">
        <p className="text-white">Due: {dueDate.toLocaleDateString()}</p>
      </div>
      <div className="bg-[#3a3d49] h-28 w-full rounded flex p-2">
        <p className="text-white">{description}</p>
      </div>
      <div className="flex items-center mt-1">
        <div className="grow">
          <BsThreeDots className="text-[#3a3d49] text-2xl" />
        </div>
        <div className="flex gap-x-8">
          <label className="label cursor-pointer gap-x-2 !p-0">
            <input
              type="checkbox"
              checked={isFailed}
              onChange={handleFailedToggle}
              className="checkbox checkbox-warning"
            />
            <span className="label-text text-black">Failed</span>
          </label>
          <label className="label cursor-pointer gap-x-2 !p-0">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={handleCompletedToggle}
              className="checkbox checkbox-warning"
            />
            <span className="label-text text-black">Completed</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Task;