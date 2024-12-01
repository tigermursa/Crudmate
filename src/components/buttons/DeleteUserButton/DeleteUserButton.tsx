"use client";

import { FaTrashAlt } from "react-icons/fa";

const DeleteUserButton = () => {
  return (
    <div>
      <button
        title="Delete User"
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        <FaTrashAlt className="text-white text-sm" />
      </button>
    </div>
  );
};

export default DeleteUserButton;
