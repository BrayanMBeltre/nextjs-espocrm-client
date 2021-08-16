import React from "react";
import { FaSearch } from "react-icons/fa";

export default function GlobalFilter({ filter, setFilter }) {
  return (
    <div className="flex">
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        className="w-full h-16 px-10 focus:outline-none"
        placeholder="Search"
      />

      <button className="flex items-center justify-center w-16 h-16 bg-indigo-600 hover:bg-indigo-700 transition-all duration-300">
        <FaSearch className="h-8 w-8 text-white" />
      </button>
    </div>
  );
}
