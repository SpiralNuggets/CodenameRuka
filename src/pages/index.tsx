import React from "react";

import { Navbar, Task } from "@/components";

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
        <div className="w-2/3 bg-white"></div>
      </div>
    </>
  );
};

export default index;
