import React from "react";

interface NavbarProps {
  onAddTask: () => void;
  onLogout: () => void;
}

const Navbar = ({ onAddTask, onLogout }: NavbarProps) => {
  return (
    <div className="bg-[#28507d] h-16 flex items-center justify-between p-4">
      <h1 className="text-white text-lg font-bold">Your App Name</h1>
      <div className="flex items-center">
        <button onClick={onAddTask} className="btn btn-primary">
          Add Task
        </button>
        <button onClick={onLogout} className="btn btn-danger ml-4">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
