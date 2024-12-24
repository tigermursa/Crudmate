"use client";

import useSWR from "swr";

import { api } from "@/utils/api"; // Assuming api.ts contains your API methods

import { toast } from "react-toastify";
import UserCard from "@/components/Card/UserCard/UserCard";
import Loader from "@/components/Loader/Loader";
import { FaRegFrown } from "react-icons/fa";
import ServerError from "@/components/Error/ServerError/ServerError";

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

  const forRestore = true;

  const userCardProps = {
    users,
    handleDeleteClick,
    forRestore,
  };

  console.log(users?.length);
  if (!users || users?.length == 0) {
    return (
      <div className="container-bg-design min-h-screen flex flex-col justify-center items-center text-white text-2xl space-y-4">
        <FaRegFrown className="text-6xl text-gray-100" />
        <span>No data available</span>
      </div>
    );
  }

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
