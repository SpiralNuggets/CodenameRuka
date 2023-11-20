// Index.jsx
import React, { useState, useEffect } from "react";
import { database } from "@/firebase";
import { ref, get, set, child, push } from "firebase/database";
import { Detail, Navbar, Task } from "@/components";
import { useCookies } from "react-cookie";

enum Priority {
  Low,
  Medium,
  High,
}

const Index = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [currentTask, setCurrentTask] = useState<any>({});

  useEffect(() => {
    if (cookies.user) {
      const fetchTasks = async () => {
        const reference = ref(database);
        await get(child(reference, `users/${cookies.user.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const fetchedTasks = snapshot.val();
              setTasks(fetchedTasks);
              setCurrentTask(fetchedTasks[0] || {});
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };

      fetchTasks();
    } else {
      console.log("User not logged in yet!");
      window.location.href = "/login";
    }
  }, [cookies.user]);

  const handleSelectTask = (task: any) => {
    setCurrentTask(task);
  };

  const handleUpdateTask = async (updatedTask: any) => {
    // Update target task in tasks array
    const updatedTasks = tasks.map((task) =>
      task.title === currentTask.title ? updatedTask : task
    );

    // Update this updatedTasks array to the database
    const reference = ref(database);
    await set(child(reference, `users/${cookies.user.uid}`), updatedTasks);

    // Update tasks and currentTask in the state
    setTasks(updatedTasks);
    setCurrentTask(updatedTask);
  };

  const handleAddTask = async () => {
    const newTask = {
      title: "New Task", // You can set default values for the new task
      desc: "",
      priority: Priority.Low,
      // Add other properties as needed
    };

    const reference = ref(database);
    const newTaskRef = push(child(reference, `users/${cookies.user.uid}`));
    const newTaskKey = newTaskRef.key;

    if (newTaskKey) {
      // Update the new task in the tasks array
      const updatedTasks = [...tasks, { ...newTask, key: newTaskKey }];

      // Filter out undefined values
      const filteredTasks = updatedTasks.filter(Boolean);

      // Update the new tasks array to the database
      await set(child(reference, `users/${cookies.user.uid}`), filteredTasks);

      // Update tasks and currentTask in the state
      setTasks(filteredTasks);
      setCurrentTask({ ...newTask, key: newTaskKey });
    }
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
                  title={task?.title || "Default Title"}
                  description={task?.desc || ""}
                  dueDate={new Date()}
                  isCompleted={
                    task?.subtasks &&
                    task.subtasks[0] &&
                    task.subtasks[0].done
                  }
                  handleClick={() => handleSelectTask(task)}
                />
              ))}
          </div>
          {/* Add Task Button */}
          <button
            onClick={handleAddTask}
            className="btn btn-primary mt-4"
          >
            Add Task
          </button>
        </div>
        <div className="w-2/3 bg-[#717274] p-2">
          <Detail
            title={currentTask.title || "Select a task"}
            dueDate={new Date() || null}
            shortDescription={currentTask.shortDesc || ""}
            description={currentTask.desc || ""}
            priority={
              typeof currentTask.priority !== "undefined"
                ? currentTask.priority
                : Priority.Low
            }
            onUpdate={handleUpdateTask} // Pass the update function to the Detail component
          />
        </div>
      </div>
    </>
  );
};

export default Index;
