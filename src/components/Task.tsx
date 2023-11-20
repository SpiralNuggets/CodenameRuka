import React from "react";
import { FiFlag } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

interface TaskProps {
  title?: string | (() => string);
  dueDate?: Date;
  description?: string;
  handleClick?: () => void;
  taskId: string; // Unique identifier for the task
}

const Task = ({
  title = () => "New Card",
  dueDate = new Date(),
  description = "",
  handleClick = () => {},
  taskId,
}: TaskProps) => {
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
      </div>
    </div>
  );
};

export default Task;