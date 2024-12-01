"use client";
import { useState } from "react";
import useSWR from "swr";
import { FaSearch } from "react-icons/fa"; // Import search icon
import { api } from "@/utils/api";
import { user } from "@/types/types";

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
    <div className="flex flex-col items-center justify-center p-4 container-bg-design">
      <h3 className="text-2xl font-semibold mb-4 text-white">
        Search for a User Using UID
      </h3>
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={uid}
          onChange={handleInputChange}
          placeholder="Enter UID"
          className="p-3 w-64 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={openModal}
          className="p-3 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-200 flex items-center justify-center"
        >
          <FaSearch size={20} /> {/* Larger icon */}
        </button>
      </div>

      {/* Modal to show user data or error */}
      {modalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-3xl w-full">
            {error ? (
              <p className="text-red-600 text-center text-lg">
                No user found with that ID.
              </p>
            ) : isLoading ? (
              <p className="text-center text-lg">Loading...</p>
            ) : data ? (
              <div>
                <h4 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                  User Details
                </h4>
                <div className="space-y-4 text-lg text-gray-700">
                  <p>
                    <strong className="text-blue-600">Name:</strong>{" "}
                    {data.data.firstName} {data.data.lastName}
                  </p>
                  <p>
                    <strong className="text-blue-600">Email:</strong>{" "}
                    {data.data.email}
                  </p>
                  <p>
                    <strong className="text-blue-600">Age:</strong>{" "}
                    {data.data.age}
                  </p>
                  <p>
                    <strong className="text-blue-600">Gender:</strong>{" "}
                    {data.data.gender}
                  </p>
                  <p>
                    <strong className="text-blue-600">Country:</strong>{" "}
                    {data.data.country}
                  </p>
                  <p>
                    <strong className="text-blue-600">City:</strong>{" "}
                    {data.data.city}
                  </p>
                  <p>
                    <strong className="text-blue-600">Phone Number:</strong>{" "}
                    {data.data.phoneNumber}
                  </p>
                  <p>
                    <strong className="text-blue-600">Work:</strong>{" "}
                    {data.data.work}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-center text-lg">No user found with that ID.</p>
            )}

            {/* Close modal button */}
            <button
              onClick={closeModal}
              className="mt-6 w-[100px] bg-red-500 text-white p-3 rounded-md hover:bg-red-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleUser;
