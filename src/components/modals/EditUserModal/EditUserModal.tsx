"use client";

import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { api } from "@/utils/api";
import { user } from "@/types/types";
import { mutate } from "swr";
import { useEffect } from "react";

const EditUserModal = ({
  user,
  isOpen,
  onClose,
}: {
  user: user | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { register, handleSubmit, reset } = useForm<user>();

  useEffect(() => {
    if (user) {
      reset(user); // Reset form with the selected user's data
    }
  }, [user, reset]);

  const onSubmit = async (data: user) => {
    try {
      if (!user) return;
      await api.updateUserByUID(user.uid, data); // Update user in the database
      toast.success("User updated successfully!");
      mutate("/get-all-users"); // Refresh the user list
      onClose(); // Close the modal
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user.");
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-11/12 max-w-xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 bg-gray-700 rounded-full hover:bg-gray-600"
        >
          <FaTimes className="text-white text-lg" />
        </button>

        <h2 className="text-xl font-bold mb-6 text-center">Edit User</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input
                {...register("firstName")}
                type="text"
                className="mt-1 p-2 w-full bg-gray-800 border border-gray-700 text-white rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input
                {...register("lastName")}
                type="text"
                className="mt-1 p-2 w-full bg-gray-800 border border-gray-700 text-white rounded-md"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                {...register("email")}
                type="email"
                className="mt-1 p-2 w-full bg-gray-800 border border-gray-700 text-white rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                {...register("phoneNumber")}
                type="text"
                className="mt-1 p-2 w-full bg-gray-800 border border-gray-700 text-white rounded-md"
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">City</label>
              <input
                {...register("city")}
                type="text"
                className="mt-1 p-2 w-full bg-gray-800 border border-gray-700 text-white rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Country</label>
              <input
                {...register("country")}
                type="text"
                className="mt-1 p-2 w-full bg-gray-800 border border-gray-700 text-white rounded-md"
              />
            </div>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Age</label>
              <input
                {...register("age")}
                type="number"
                className="mt-1 p-2 w-full bg-gray-800 border border-gray-700 text-white rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select
                {...register("gender")}
                className="mt-1 p-2 w-full bg-gray-800 border border-gray-700 text-white rounded-md"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          {/* Full-width Field */}
          <div>
            <label className="block text-sm font-medium">Work</label>
            <input
              {...register("work")}
              type="text"
              className="mt-1 p-2 w-full bg-gray-800 border border-gray-700 text-white rounded-md"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-md text-white font-bold transition"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
