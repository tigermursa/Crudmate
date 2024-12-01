// components/UpdateUserModal.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { user } from "@/types/types"; // Assuming you have a user type

interface UpdateUserModalProps {
  user: user;
  onClose: () => void;
  onUpdate: (updatedUser: user) => void;
}

const UpdateUserModal: React.FC<UpdateUserModalProps> = ({
  user,
  onClose,
  onUpdate,
}) => {
  const [updatedUser, setUpdatedUser] = useState<user>({ ...user });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/update-user/${user.uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      if (!res.ok) throw new Error("Failed to update user");

      const updatedUserData = await res.json();
      onUpdate(updatedUserData); // Update parent state with the new user details
      onClose(); // Close the modal
    } catch (error) {
      console.error(error);
      alert("Error updating user");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[400px]">
        <h2 className="text-xl font-semibold mb-4">Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold">First Name</label>
            <input
              type="text"
              name="firstName"
              value={updatedUser.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={updatedUser.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Age</label>
            <input
              type="number"
              name="age"
              value={updatedUser.age}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Gender</label>
            <input
              type="text"
              name="gender"
              value={updatedUser.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Location</label>
            <input
              type="text"
              name="city"
              value={updatedUser.city}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="City"
            />
            <input
              type="text"
              name="country"
              value={updatedUser.country}
              onChange={handleChange}
              className="w-full p-2 border rounded mt-2"
              placeholder="Country"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Phone</label>
            <input
              type="text"
              name="phoneNumber"
              value={updatedUser.phoneNumber}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold">Work</label>
            <input
              type="text"
              name="work"
              value={updatedUser.work}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">
            Update
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-red-500 hover:text-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateUserModal;
