import DeleteUserButton from "@/components/buttons/DeleteUserButton/DeleteUserButton";
import UpdateUserModal from "@/components/modals/UpdateUserModal/UpdateUserModal";
import { getAllUsers } from "@/lib/getAllUsers";
import { user } from "@/types/types";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaBriefcase,
  FaVenusMars,
  FaCalendarAlt,
} from "react-icons/fa";

// Function to generate a deterministic color based on the user's name
const getColorFromName = (name: string) => {
  // Simple hash function to generate a number from the name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0; // Converting to 32bit integer
  }

  // Map the hash to one of the colors in the list
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

  // Use the hash modulo the number of colors to select a color
  return colors[Math.abs(hash) % colors.length];
};

const Home = async () => {
  const users = await getAllUsers();

  return (
    <div className="w-full mx-auto px-4 py-8 container-bg-design">
      <h3 className="text-3xl font-semibold text-center text-gray-100 mb-8">
        All Users
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 cursor-grab">
        {users?.data?.map((user: user) => (
          <div
            key={user?.uid}
            className="bg-gray-800 p-4 rounded-lg shadow-md relative hover:shadow-lg transition-shadow border-2 border-red-100 w-[220px] lg:w-[300px]"
          >
            {/* Action Buttons */}
            <div className="absolute top-2 right-2 flex space-x-2">
              {/* update button */}
              <UpdateUserModal />
              {/* user delete button */}
              <DeleteUserButton />
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
    </div>
  );
};

export default Home;
