"use client";

import useSWR from "swr";

import { api } from "@/utils/api"; // Assuming api.ts contains your API methods

import { toast } from "react-toastify";
import UserCard from "@/components/Card/UserCard/UserCard";

const AllDeletedUsers = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, error, isLoading, mutate } = useSWR(
    "/users/deleted",
    api.getAllDeletedUsers
  );

  const handleDeleteClick = async (uid: string) => {
    try {
      // Call the toggle delete API
      const result = await api.deleteUserByUIDToggle(uid);
      if (result.success) {
        // If success, re-fetch the user list to update the UI
        toast.success("User Resorted Successfully");
        mutate(); // This will trigger a re-fetch of the users list
      }
    } catch (error) {
      console.error("Failed to toggle delete status", error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  const users = data?.data;

  const userCardProps = {
    users,
    handleDeleteClick,
  };

  return (
    <div className="w-full  mx-auto px-4 py-8 container-bg-design">
      <h3 className="text-3xl font-semibold text-center text-gray-100 mb-8">
        All Deleted Users
      </h3>

      <UserCard userCardProps={userCardProps} />
    </div>
  );
};

export default AllDeletedUsers;
