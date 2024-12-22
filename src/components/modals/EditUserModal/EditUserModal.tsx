"use client";
import { useForm } from "react-hook-form";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import { api } from "@/utils/api"; // Assuming the API file is here
import { user } from "@/types/types";
import { mutate } from "swr";

const EditUserModal = ({
  user,
  isOpen,
  onClose,
}: {
  user: user;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { register, handleSubmit } = useForm<user>({
    defaultValues: user, // Prepopulate form with user data
  });

  const onSubmit = async (data: user) => {
    try {
      await api.updateUserByUID(user.uid, data); // Update user
      toast.success("User updated successfully!");
      mutate("/get-all-users");
      onClose(); // Close the modal
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-700 hover:bg-gray-600"
        >
          <FaTimes className="text-white text-lg" />
        </button>

        <h2 className="text-xl font-bold mb-4">Edit User</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div></div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              UID
            </label>
            <input
              {...register("uid")}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              {...register("firstName")}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              {...register("lastName")}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              {...register("email")}
              type="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Age
            </label>
            <input
              {...register("age")}
              type="number"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              {...register("gender")}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              City
            </label>
            <input
              {...register("city")}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <input
              {...register("country")}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              {...register("phoneNumber")}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Work
            </label>
            <input
              {...register("work")}
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white p-2 w-full rounded-md"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
