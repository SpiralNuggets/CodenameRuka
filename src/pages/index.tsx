import React, { useState, useEffect } from "react";
import { database } from "@/firebase";
import { ref, onValue, child, get, set, remove } from "firebase/database";
import { Detail, Navbar, Task } from "@/components";
import { useCookies } from "react-cookie";

enum Priority {
  Low,
  Medium,
  High,
}

const Index = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [tasks, setTasks] = useState<any[]>([]); // manage tasks as state

  useEffect(() => {
    // Checking if the user is logged in
    if (cookies.user) {
      const fetchTasks = async () => {
        // Getting user tasks
        const reference = ref(database);
        await get(child(reference, `users/${cookies.user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setTasks(snapshot.val());
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchTasks(); // fetching tasks for the logged-in user
    } else {
      console.log("User not logged in yet!");
    }
  }, [cookies.user]); // dependency on `cookies.user`

  return (
    <>
      <Navbar />
      <div className="flex">
        <div
          className="w-1/3 bg-neutral-300 grid grid-flow-row gap-4 p-4"
          id="tasklists"
        >
          <div className="bg-[#3a3d49] h-8 w-full rounded flex items-center p-2">
            {tasks &&
              tasks.map((task, index) => (
                <Task
                  key={index} 
                  title={task.title}
                  description={task.desc}
                  dueDate={new Date()} // specify actual date field
                  isCompleted={task.subtasks && task.subtasks[0] && task.subtasks[0].done}  // specify actual completion field
                  isFailed={false}  // specify actual failure field
                />
              ))}
          </div>
        </div>
        <div className="w-2/3 bg-[#717274] p-2">
          {/* TODO: put detailed view here */}
        </div>
      </div>
    </>
  );
};

export default Index;
