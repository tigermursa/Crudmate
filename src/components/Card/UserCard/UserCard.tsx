import { user } from "@/types/types";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaEdit,
  FaMapMarkerAlt,
  FaTrashAlt,
  FaVenusMars,
  FaUser,
} from "react-icons/fa";
import { ImPhone } from "react-icons/im";

interface UserCardProps {
  users: user[];
  handleEditClick?: (user: user) => void;
  handleDeleteClick: (uid: string) => void;
}

const UserCard = ({ userCardProps }: { userCardProps: UserCardProps }) => {
  const { users, handleEditClick, handleDeleteClick } = userCardProps;

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users?.map((user: user) => {
          // Determine avatar background color based on gender
          const avatarColor =
            user.gender === "Male"
              ? "bg-blue-400"
              : user.gender === "Female"
              ? "bg-pink-400"
              : "bg-gray-400"; // Default color for unspecified gender

          return (
            <div
              key={user?.uid}
              className="bg-cyan-950 p-4 rounded-lg   relative hover:shadow-2xl shadow-black  cursor-pointer transition-shadow border-2 border-white w-[220px] lg:w-[300px] sour-gummy"
            >
              {/* Avatar */}
              <div className="flex flex-col items-center mb-4">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold ${avatarColor}`}
                >
                  {user.gender === "Male" || user.gender === "Female" ? (
                    <>
                      {user.firstName.charAt(0)}
                      {user.lastName.charAt(0)}
                    </>
                  ) : (
                    <FaUser /> // Generic user icon for unspecified gender
                  )}
                </div>
                <h4 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-50 mt-5">
                  {user.firstName} {user.lastName}
                </h4>
                <p className="text-xs sm:text-sm md:text-lg text-white">
                  {user.email}
                </p>
              </div>

              {/* User Details */}
              <div className="mt-4 space-y-2 text-gray-50 text-xs sm:text-sm md:text-lg">
                <div className="flex items-center space-x-1">
                  <FaBriefcase className="text-white text-xs sm:text-sm md:text-lg" />
                  <p>
                    <strong>Work:</strong> {user.work}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <div className="flex items-center space-x-1">
                    <FaCalendarAlt className="text-white text-xs sm:text-sm md:text-lg" />
                    <p>
                      <strong>Age:</strong> {user.age}
                    </p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FaVenusMars className="text-white text-xs sm:text-sm md:text-lg" />
                    <p>
                      <strong>Gender:</strong> {user.gender || "Unspecified"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1 truncate">
                  <FaMapMarkerAlt className="text-white text-xs sm:text-sm md:text-lg" />
                  <p>
                    <strong>Location:</strong> {user.city}, {user.country}
                  </p>
                </div>
                <div className="flex items-center space-x-1">
                  <ImPhone className="text-white text-xs sm:text-sm md:text-lg" />
                  <p>
                    <strong>Phone:</strong> {user.phoneNumber}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex justify-center space-x-2">
                {handleEditClick && (
                  <button
                    title="Edit User"
                    className="p-2 rounded-full hover:bg-gray-400 transition-colors"
                    onClick={() => handleEditClick(user)} // Only call handleEditClick if it's defined
                  >
                    <FaEdit className="text-white text-sm" />
                  </button>
                )}
                <button
                  title={user.isDeleted ? "Restore User" : "Delete User"}
                  className="p-2 rounded-md  hover:bg-gray-600 hover:bg-opacity-30 transition-colors"
                  onClick={() => handleDeleteClick(user.uid)} // Toggle delete status
                >
                  <FaTrashAlt className="text-white text-sm" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserCard;
