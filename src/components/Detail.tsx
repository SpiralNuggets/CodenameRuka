import React, { useState } from "react";

import { FiFlag } from "react-icons/fi";

enum Priority {
  Low,
  Medium,
  High,
}

interface DetailProps {
  title: string;
  dueDate?: Date;
  shortDescription?: string;
  description?: string;
  priority?: Priority;
}

const Detail = ({
  title,
  dueDate = new Date(),
  shortDescription = "",
  description = "",
  priority = Priority.Low,
}: DetailProps) => {
  const [flag, setFlag] = useState<Priority>(priority);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center gap-x-2">
        <h1 className="text-white">Title:</h1>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-sm w-full max-w-lg bg-[#3a3d49] text-white !outline-neutral-400"
          value={title}
        />
      </div>
      <div className="flex items-center gap-x-2">
        <h1 className="text-white">Due:</h1>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-sm w-full max-w-lg bg-[#3a3d49] text-white !outline-neutral-400"
          value={dueDate.toLocaleDateString()}
        />
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-white font-medium text-lg">Short Description</h1>
        <textarea
          className="textarea bg-[#3a3d49] text-white !outline-neutral-400 h-40"
          placeholder="Type here"
          value={shortDescription}
        ></textarea>
      </div>
      <div className="flex flex-col gap-y-2">
        <h1 className="text-white font-medium text-lg">Description</h1>
        <textarea
          className="textarea bg-[#3a3d49] text-white !outline-neutral-400 h-64"
          placeholder="Type here"
          value={description}
        ></textarea>
      </div>
      <div className="flex items-center gap-x-2">
        <h1 className="text-white">Priority:</h1>
        <FiFlag
          className={`text-[#50af53] text-2xl cursor-pointer ${
            flag === Priority.Low && "fill-[#50af53]"
          }`}
          onClick={() => setFlag(Priority.Low)}
        />
        <FiFlag
          className={`text-[#c29b4a] text-2xl cursor-pointer ${
            flag === Priority.Medium && "fill-[#c29b4a]"
          }`}
          onClick={() => setFlag(Priority.Medium)}
        />
        <FiFlag
          className={`text-[#e4481b] text-2xl cursor-pointer ${
            flag === Priority.High && "fill-[#e4481b]"
          }`}
          onClick={() => setFlag(Priority.High)}
        />
      </div>
    </div>
  );
};

export default Detail;
