// Navbar.tsx
import React from "react";

interface NavbarProps {
  onAddTask: () => void; // Adjust the type based on the actual type of onAddTask
}

const Navbar: React.FC<NavbarProps> = ({ onAddTask }) => {
  return (
    <div className="bg-[#28507d] h-16 flex items-center justify-between p-4">
      <h1 className="text-white text-lg font-bold">Your App Name</h1>
      <button onClick={onAddTask} className="btn btn-primary">
        Add Task
      </button>
    </div>
  );
};

export default Navbar;
