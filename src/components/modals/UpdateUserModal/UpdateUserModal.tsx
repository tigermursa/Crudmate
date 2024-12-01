"use client";

import { FaEdit } from "react-icons/fa";

const UpdateUserModal = () => {
  return (
    <div>
      <button
        title="Edit User"
        className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
      >
        <FaEdit className="text-white text-sm" />
      </button>
    </div>
  );
};

export default UpdateUserModal;
