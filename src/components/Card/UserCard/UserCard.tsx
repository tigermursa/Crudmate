import { user } from "@/types/types";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaEdit,
  FaMapMarkerAlt,
  FaPhone,
  FaTrashAlt,
  FaVenusMars,
} from "react-icons/fa";

interface UserCardProps {
  users: user[];
  handleEditClick: (user: user) => void;
  handleDeleteClick: (uid: string) => void;
  getColorFromName: (name: string) => string;
}

const UserCard = ({ userCardProps }: { userCardProps: UserCardProps }) => {
  const { users, handleEditClick, handleDeleteClick, getColorFromName } =
    userCardProps;

  return (
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
  );
};

export default UserCard;
