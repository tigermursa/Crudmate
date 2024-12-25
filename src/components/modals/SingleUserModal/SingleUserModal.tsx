import {
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
} from "react-icons/fa";
import { MdOutlineLocationCity } from "react-icons/md";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import LoaderInner from "@/components/Loader/LoaderInner";

interface UserModalProps {
  data: any;
  error: any;
  isLoading: boolean;
  onClose: () => void;
}

const SingleUserModal: React.FC<UserModalProps> = ({
  data,
  error,
  isLoading,
  onClose,
}) => {
  const genderIcon =
    data?.data?.gender === "Male" ? (
      <IoMdMale className="text-blue-500" />
    ) : (
      <IoMdFemale className="text-pink-500" />
    );

  const handleCopy = () => {
    if (data) {
      const userInfo = `
          Name: ${data.data.firstName} ${data.data.lastName}
          Email: ${data.data.email}
          Gender: ${data.data.gender}
          City: ${data.data.city}
          Country: ${data.data.country}
          Phone: ${data.data.phoneNumber}
          Work: ${data.data.work}
        `;
      navigator.clipboard.writeText(userInfo);
      alert("User information copied to clipboard!");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full text-gray-200 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-red-500 rounded-full hover:bg-red-600 text-white transition"
        >
          <FaTimes size={16} />
        </button>
        {error ? (
          <p className="text-red-500 font-bold text-center text-lg">
            No user found with that ID.
          </p>
        ) : isLoading ? (
          <div>
            <LoaderInner />
          </div>
        ) : data ? (
          <div>
            <h4 className="text-2xl font-semibold mb-6 text-center text-blue-400">
              User Details
            </h4>
            <div className="space-y-4 text-lg">
              <p className="flex items-center">
                <FaUser className="mr-2 text-blue-400" />
                <strong>Name:</strong>{" "}
                <span className="ml-2">
                  {data.data.firstName} {data.data.lastName}
                </span>
              </p>
              <p className="flex items-center">
                <FaEnvelope className="mr-2 text-green-400" />
                <strong>Email:</strong>{" "}
                <span className="ml-2">{data.data.email}</span>
              </p>
              <p className="flex items-center">
                {genderIcon}
                <strong className="ml-2">Gender:</strong>{" "}
                <span className="ml-2">{data.data.gender}</span>
              </p>
              <p className="flex items-center">
                <MdOutlineLocationCity className="mr-2 text-purple-400" />
                <strong>City:</strong>{" "}
                <span className="ml-2">{data.data.city}</span>
              </p>
              <p className="flex items-center">
                <MdOutlineLocationCity className="mr-2 text-yellow-400" />
                <strong>Country:</strong>{" "}
                <span className="ml-2">{data.data.country}</span>
              </p>
              <p className="flex items-center">
                <FaPhone className="mr-2 text-red-400" />
                <strong>Phone:</strong>{" "}
                <span className="ml-2">{data.data.phoneNumber}</span>
              </p>
              <p className="flex items-center">
                <FaBriefcase className="mr-2 text-blue-500" />
                <strong>Work:</strong>{" "}
                <span className="ml-2">{data.data.work}</span>
              </p>
            </div>
            <button
              onClick={handleCopy}
              className="mt-6 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition"
            >
              Copy
            </button>
          </div>
        ) : (
          <p className="text-center text-lg">No user found with that ID.</p>
        )}
      </div>
    </div>
  );
};

export default SingleUserModal;
