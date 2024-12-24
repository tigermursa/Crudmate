import { useState } from "react";
import { user } from "@/types/types";
import UserModal from "@/components/modals/UserModal/UserModal";
import { FaMars, FaVenus, FaGenderless } from "react-icons/fa";

interface UserCardProps {
  forRestore?: boolean;
  users: user[];
  handleEditClick?: (user: user) => void;
  handleDeleteClick: (uid: string) => void;
}

const UserCard = ({ userCardProps }: { userCardProps: UserCardProps }) => {
  const { users, handleEditClick, handleDeleteClick, forRestore } =
    userCardProps;
  const [selectedUser, setSelectedUser] = useState<user | null>(null);

  const getGenderIcon = (gender: string) => {
    switch (gender.toLowerCase()) {
      case "male":
        return <FaMars className="text-blue-500 text-2xl" />;
      case "female":
        return <FaVenus className="text-pink-500 text-2xl" />;
      default:
        return <FaGenderless className="text-gray-500 text-2xl" />;
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {users.map((user) => (
          <div
            key={user.uid}
            className="bg-blue-900 bg-opacity-20 p-4 rounded-lg relative hover:shadow-2xl shadow-black cursor-pointer transition-shadow border-2 border-white w-[220px] lg:w-[300px]"
            onClick={() => setSelectedUser(user)} // Open modal
          >
            {/* Basic Info */}
            <div className="flex justify-between items-center">
              <h4 className="text-lg sm:text-xl text-gray-50 truncate sour-gummy">
                {user.firstName} {user.lastName}
              </h4>
              <p className="text-sm text-gray-400 ms-2">{user.uid}</p>
            </div>
            <p className="mt-2 text-sm text-gray-300">
              <strong></strong> {user.work}
            </p>

            {/* Gender Icon */}
            <div className="absolute bottom-2 right-2">
              {getGenderIcon(user.gender || "Unspecified")}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      <UserModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        forRestore={forRestore} // Pass forRestore prop
      />
    </div>
  );
};

export default UserCard;
