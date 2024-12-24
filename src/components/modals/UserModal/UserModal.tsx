import { FaEdit, FaTrashAlt, FaUser, FaVenusMars } from "react-icons/fa";
import { ImPhone } from "react-icons/im";
import { MdWork, MdEmail, MdLocationOn } from "react-icons/md";
import { user } from "@/types/types";
import { IoMdClose } from "react-icons/io"; // Close icon

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: user | null;
  handleEditClick?: (user: user) => void;
  handleDeleteClick: (uid: string) => void;
  forRestore?: boolean;
}

const UserModal = ({
  isOpen,
  onClose,
  user,
  handleEditClick,
  handleDeleteClick,
  forRestore, // New prop to control button rendering
}: UserModalProps) => {
  if (!isOpen || !user) return null;

  const handleEdit = (user: user) => {
    if (handleEditClick) handleEditClick(user);
    onClose(); // Close the modal after editing
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="relative bg-gray-900 text-white rounded-lg w-11/12 max-w-lg p-6 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition"
        >
          <IoMdClose size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center border-b border-gray-700 pb-4">
          <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
            <FaUser /> User Info
          </h2>
        </div>

        {/* Modal Body */}
        <div className="mt-4 space-y-4 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <FaUser className="text-blue-400" />
            <p>
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MdWork className="text-green-400" />
            <p>
              <strong>Work:</strong> {user.work}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <FaVenusMars className="text-pink-400" />
            <p>
              <strong>Gender:</strong> {user.gender || "Unspecified"}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MdLocationOn className="text-yellow-400" />
            <p>
              <strong>Location:</strong> {user.city}, {user.country}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ImPhone className="text-purple-400" />
            <p>
              <strong>Phone:</strong> {user.phoneNumber}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <MdEmail className="text-red-400" />
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-between items-center mt-6 border-t border-gray-700 pt-4">
          {handleEditClick && (
            <button
              className="flex items-center text-white hover:text-blue-600 rounded transition"
              onClick={() => handleEdit(user)}
            >
              <FaEdit className="mr-2" />
            </button>
          )}
          {/* Conditional Button Rendering */}
          <button
            className="flex items-center text-white hover:text-red-600 rounded transition"
            onClick={() => {
              handleDeleteClick(user.uid); // You can modify this to handle restoring the user
              onClose();
            }}
          >
            {forRestore ? (
              <span className="border p-2 rounded-md text-sm">Restore</span> // Restore button text
            ) : (
              <FaTrashAlt className="mr-2" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
