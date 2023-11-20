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
  const [currentTask, setCurrentTask] = useState<any>({}); // manage current detail task as state

  useEffect(() => {
    // Checking if the user is logged in
    if (cookies.user) {
      const fetchTasks = async () => {
        // Getting user tasks
        const reference = ref(database);
        await get(child(reference, `users/${cookies.user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const fetchedTasks = snapshot.val();
              setTasks(fetchedTasks);
              setCurrentTask(fetchedTasks[0] || {}); // Set first task as current task initially
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
      window.location.href = "/login";
    }
  }, [cookies.user]); // dependency on `cookies.user`

  const handleSelectTask = (task: any) => {
    setCurrentTask(task); // update current task when a task is clicked
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <div
          className="w-1/3 bg-neutral-300 grid grid-flow-row gap-4 p-4"
          id="tasklists"
        >
          <div className="bg-[#3a3d49] w-full rounded flex items-center p-2">
            {tasks &&
              tasks.map((task, index) => (
                <Task
                  key={index} 
                  title={task.title}
                  description={task.desc}
                  dueDate={new Date()} // specify actual date field
                  isCompleted={task.subtasks && task.subtasks[0] && task.subtasks[0].done}  // specify actual completion field
                  isFailed={false}  // specify actual failure field
                  handleClick={() => handleSelectTask(task)} // add click handler
                />
              ))}
          </div>
        </div>
        <div className="w-2/3 bg-[#717274] p-2">
        <Detail
            title={currentTask.title || 'Select a task'} // set title from current task or default text
            dueDate={new Date() || null}  // specify actual due date field
            shortDescription={currentTask.shortDesc || ''} // set short description from current task
            description={currentTask.desc || ''} // set description from current task
            priority={typeof currentTask.priority !== 'undefined' ? currentTask.priority : Priority.Low}  // set priority from current task or default to low
          />
        </div>
      </div>
    </>
  );
};

export default Index; 
