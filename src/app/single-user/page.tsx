"use client";

import { useState } from "react";
import useSWR from "swr";
import { FaSearch } from "react-icons/fa";
import { api } from "@/utils/api";
import { user } from "@/types/types";
import SingleUserModal from "@/components/modals/SingleUserModal/SingleUserModal";

interface UserResponse {
  data: user;
}

const SingleUser = () => {
  const [uid, setUid] = useState<string>(""); // State to store the uid input
  const [modalOpen, setModalOpen] = useState<boolean>(false); // State to control modal visibility

  // Fetch data only if uid is provided (triggered on button press)
  const { data, error, isLoading } = useSWR<UserResponse | null>(
    modalOpen ? (uid ? `${uid}` : null) : null, // Trigger fetch on modal open
    modalOpen ? (uid ? api.getUserByUID : null) : null
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUid(e.target.value); // Update the uid state as the user types
  };

  const openModal = () => {
    if (uid) {
      setModalOpen(true); // Open modal when search is clicked
    }
  };

  const closeModal = () => {
    setModalOpen(false); // Close modal
    setUid(""); // Reset UID field
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen  text-gray-200 container-bg-design ">
      <h3 className="text-2xl font-semibold mb-6 text-blue-100">
        Search for a User Using UID
      </h3>
      <div className="flex items-center space-x-3 mb-6">
        <input
          type="text"
          value={uid}
          onChange={handleInputChange}
          placeholder="Enter UID"
          className="p-3 w-72 bg-gray-800 border border-gray-700 rounded-l-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={openModal}
          className="p-3 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition duration-200 flex items-center justify-center space-x-2"
        >
          <FaSearch size={18} />
          <span>Search</span>
        </button>
      </div>

      {/* Modal for displaying user data or errors */}
      {modalOpen && (
        <SingleUserModal
          data={data}
          error={error}
          isLoading={isLoading}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default SingleUser;
