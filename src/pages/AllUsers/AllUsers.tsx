"use client";

import useSWR from "swr";

import { api } from "@/utils/api"; // Assuming api.ts contains your API methods
import { user } from "@/types/types";
import { useState } from "react";
import EditUserModal from "@/components/modals/EditUserModal/EditUserModal";
import { toast } from "react-toastify";
import UserCard from "@/components/Card/UserCard/UserCard";
import Loader from "@/components/Loader/Loader";
import { FaRegFrown } from "react-icons/fa";
import ServerError from "@/components/Error/ServerError/ServerError";

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
        toast.success("User Deleted Successfully");
        mutate(); // This will trigger a re-fetch of the users list
      }
    } catch (error) {
      console.error("Failed to toggle delete status", error);
    }
  };

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error)
    return (
      <div>
        {" "}
        <ServerError />{" "}
      </div>
    );

  const users = data?.data;

  const userCardProps = {
    users,
    handleEditClick,
    handleDeleteClick,
  };

  // console.log(users?.length);
  if (!users || users?.length == 0) {
    return (
      <div className="container-bg-design min-h-screen flex flex-col justify-center items-center text-white text-2xl space-y-4">
        <FaRegFrown className="text-6xl text-gray-100" />
        <span>No data available</span>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen   mx-auto px-4 py-8 container-bg-design">
      <h3 className="text-3xl font-semibold text-center text-gray-100 mb-8">
        All Users
      </h3>
      <UserCard userCardProps={userCardProps} />
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
