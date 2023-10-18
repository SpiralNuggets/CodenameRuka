import React from "react";

import { Detail, Navbar, Task } from "@/components";

enum Priority {
  Low,
  Medium,
  High,
}

const index = () => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="w-1/3 bg-neutral-300 grid grid-flow-row gap-4 p-4">
          <Task
            title="Card 1"
            description="Card 1 Description"
            dueDate={new Date()}
            isCompleted={true}
            isFailed={true}
          />
          <Task
            title="Card 2"
            description="Card 2 Description"
            dueDate={new Date()}
            isCompleted={true}
            isFailed={false}
          />
          <Task
            title="Card 3"
            description="Card 2 Description"
            dueDate={new Date()}
            isCompleted={false}
            isFailed={false}
          />
        </div>
        <div className="w-2/3 bg-[#717274] p-2">
          <Detail
            title="Card 1"
            dueDate={new Date()}
            shortDescription="Card 1 Short Description"
            description="Card 1 Description"
            priority={Priority.Low}
          />
        </div>
      </div>
    </>
  );
};

export default index;
