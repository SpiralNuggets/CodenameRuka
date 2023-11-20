// Index.tsx
import React, { useState, useEffect } from "react";
import { database } from "@/firebase";
import { ref, get, set, child } from "firebase/database";
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

  const handleFailedToggle = async (taskId: string, isFailed: boolean) => {
    // Update the tasks array with the new failed state
    const updatedTasks = tasks.map((task) =>
      task.key === taskId ? { ...task, isFailed } : task
    );

    // Update the tasks array in the database
    const reference = ref(database);
    await set(child(reference, `users/${cookies.user.uid}`), updatedTasks);

    // Update tasks in the state
    setTasks(updatedTasks);
  };

  const handleCompletedToggle = async (taskId: string, isCompleted: boolean) => {
    // Update the tasks array with the new completed state
    const updatedTasks = tasks.map((task) =>
      task.key === taskId ? { ...task, isCompleted } : task
    );

    // Update the tasks array in the database
    const reference = ref(database);
    await set(child(reference, `users/${cookies.user.uid}`), updatedTasks);

    // Update tasks in the state
    setTasks(updatedTasks);
  };

  const handleAddTask = async () => {
    // Create a new task object
    const newTask = {
      title: "New Task",
      description: "",
      shortDescription: "",
      priority: Priority.Low,
      isCompleted: false,
      isFailed: false,
      dueDate: new Date(),
    };

    // Add this new task to the tasks array
    const updatedTasks = [...tasks, newTask];

    // Update the tasks array in the database
    const reference = ref(database);
    await set(child(reference, `users/${cookies.user.uid}`), updatedTasks);

    // Update tasks and currentTask in the state
    setTasks(updatedTasks);
    setCurrentTask(newTask);
  };

  const handleLogout = () => {
    // Remove the user cookie
    removeCookie("user");

    // Redirect to the login page
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar onAddTask={handleAddTask} onLogout={handleLogout} />
      <div className="flex">
        <div
          className="w-1/3 bg-neutral-300 p-4 overflow-y-auto max-h-screen"
          id="tasklists"
        >
          <div className="bg-[#3a3d49] w-full rounded p-2">
            {tasks &&
              tasks.map((task, index) => (
                <Task
                  key={index}
                  title={task?.title || "Default Title"}
                  description={task?.description || ""}
                  dueDate={
                    task?.dueDate
                      ? new Date(task.dueDate) // Convert the string to a Date object
                      : new Date()
                  }
                  isCompleted={task?.isCompleted || false}
                  isFailed={task?.isFailed || false}
                  handleClick={() => handleSelectTask(task)}
                  onFailedToggle={(taskId, isFailed) =>
                    handleFailedToggle(taskId, isFailed)
                  }
                  onCompletedToggle={(taskId, isCompleted) =>
                    handleCompletedToggle(taskId, isCompleted)
                  }
                  taskId={task.key}
                />
              ))}
          </div>
        </div>
        <div className="w-2/3 bg-[#717274] p-2">
          <Detail
            title={currentTask.title || "Select a task"}
            dueDate={new Date() || null}
            shortDescription={currentTask.shortDescription || ""}
            description={currentTask.description || ""}
            priority={
              typeof currentTask.priority !== "undefined"
                ? currentTask.priority
                : Priority.Low
            }
            onUpdate={handleUpdateTask}
          />
        </div>
      </div>
    </>
  );
};

export default Index;