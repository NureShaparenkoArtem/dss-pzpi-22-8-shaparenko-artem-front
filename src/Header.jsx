import React from "react";

const Header = ({ onButtonClick }) => {
  return (
    <header className="flex justify-around bg-gray-100">
      <button
        onClick={() => onButtonClick("department")}
        className="w-1/4 px-4 py-2 bg-blue-500 text-white hover:bg-blue-700"
      >
        Departments
      </button>
      <button
        onClick={() => onButtonClick("good")}
        className="w-1/4 px-4 py-2 bg-green-500 text-white hover:bg-green-700"
      >
        Goods
      </button>
      <button
        onClick={() => onButtonClick("worker")}
        className="w-1/4 px-4 py-2 bg-yellow-500 text-white hover:bg-yellow-700"
      >
        Workers
      </button>
      <button
        onClick={() => onButtonClick("sale")}
        className="w-1/4 px-4 py-2 bg-red-500 text-white hover:bg-red-700"
      >
        Sales
      </button>
    </header>
  );
};

export default Header;
