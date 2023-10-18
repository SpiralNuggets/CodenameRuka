import React from "react";

import { FiFlag } from "react-icons/fi";
import { BsThreeDots } from "react-icons/bs";

interface TaskProps {
  title: string;
  dueDate?: Date;
  description?: string;
  isFailed?: boolean;
  isCompleted?: boolean;
}

const Task = ({
  title = "New Card",
  dueDate = new Date(),
  description = "",
  isFailed = false,
  isCompleted = false,
}: TaskProps) => {
  return (
    <div className="bg-neutral-400 w-full h-auto rounded-lg border-2 border-[#c29b4a] p-2 flex flex-col gap-1 max-h-56">
      <div className="bg-[#3a3d49] h-8 w-full rounded flex items-center p-2">
        <p className="text-white grow">{title}</p>
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
              className="checkbox checkbox-warning"
            />
            <span className="label-text text-black">Failed</span>
          </label>
          <label className="label cursor-pointer gap-x-2 !p-0">
            <input
              type="checkbox"
              checked={isCompleted}
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
