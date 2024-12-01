"use client";

import useSWR from "swr";

import {
  FaEdit,
  FaTrashAlt,
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaVenusMars,
  FaCalendarAlt,
} from "react-icons/fa";
import { api } from "@/utils/api"; // Assuming api.ts contains your API methods
import { user } from "@/types/types";
import { useState } from "react";
import EditUserModal from "@/components/modals/EditUserModal/EditUserModal";
import { toast } from "react-toastify";

// Function to generate a deterministic color based on the user's name
const getColorFromName = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0; // Converting to 32bit integer
  }

  const colors = [
    "bg-red-400",
    "bg-blue-400",
    "bg-green-400",
    "bg-yellow-400",
    "bg-purple-400",
    "bg-pink-400",
    "bg-indigo-400",
    "bg-teal-400",
  ];

  return colors[Math.abs(hash) % colors.length];
};

const AllUsers = () => {
  const [selectedUser, setSelectedUser] = useState<user | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isLoading, mutate } = useSWR(
    "/get-all-users",
    api.getAllUsers
  );

  const handleEditClick = (user: user) => {
    setSelectedUser(user); // Set the user to be edited
    setModalOpen(true); // Open the modal
  };

  const handleDeleteClick = async (uid: string) => {
    try {
      // Call the toggle delete API
      const result = await api.deleteUserByUIDToggle(uid);
      if (result.success) {
        // If success, re-fetch the user list to update the UI
        toast.success("Yo Toggled");
        mutate(); // This will trigger a re-fetch of the users list
      }
    } catch (error) {
      console.error("Failed to toggle delete status", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  const users = data?.data;

  return (
    <div className="w-full  mx-auto px-4 py-8 container-bg-design">
      <h3 className="text-3xl font-semibold text-center text-gray-100 mb-8">
        All Users
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users?.map((user: user) => (
          <div
            key={user?.uid}
            className="bg-gray-800 p-4 rounded-lg shadow-md relative hover:shadow-lg transition-shadow border-2 border-red-100 w-[220px] lg:w-[300px]"
          >
            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex space-x-2">
              <button
                title="Edit User"
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                onClick={() => handleEditClick(user)} // Open modal with user data
              >
                <FaEdit className="text-white text-sm" />
              </button>
              <button
                title={user.isDeleted ? "Restore User" : "Delete User"}
                className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                onClick={() => handleDeleteClick(user.uid)} // Toggle delete status
              >
                <FaTrashAlt className="text-white text-sm" />
              </button>
            </div>

            {/* Avatar */}
            <div className="flex flex-col items-center">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-xl font-bold ${getColorFromName(
                  user.firstName + user.lastName
                )} mb-4`}
              >
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-50">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-xs sm:text-sm md:text-base text-gray-400">
                {user.email}
              </p>
            </div>

            {/* User Details */}
            <div className="mt-4 space-y-2 text-gray-50 text-xs sm:text-sm md:text-base">
              <div className="flex items-center space-x-1">
                <FaCalendarAlt className="text-gray-400 text-xs sm:text-sm md:text-base" />
                <p>
                  <strong>Age:</strong> {user.age}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <FaVenusMars className="text-gray-400 text-xs sm:text-sm md:text-base" />
                <p>
                  <strong>Gender:</strong> {user.gender}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <FaMapMarkerAlt className="text-gray-400 text-xs sm:text-sm md:text-base" />
                <p>
                  <strong>Location:</strong> {user.city}, {user.country}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <FaPhone className="text-gray-400 text-xs sm:text-sm md:text-base" />
                <p>
                  <strong>Phone:</strong> {user.phoneNumber}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <FaBriefcase className="text-gray-400 text-xs sm:text-sm md:text-base" />
                <p>
                  <strong>Work:</strong> {user.work}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {selectedUser && (
        <EditUserModal
          user={selectedUser}
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)} // Close modal
        />
      )}
    </div>
  );
};

export default AllUsers;
