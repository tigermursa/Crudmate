import { FaTimes } from "react-icons/fa";

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
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full text-gray-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-red-500 rounded-full hover:bg-red-600 text-white transition"
        >
          <FaTimes size={16} />
        </button>
        {error ? (
          <p className="text-red-500 text-center text-lg">
            No user found with that ID.
          </p>
        ) : isLoading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : data ? (
          <div>
            <h4 className="text-2xl font-semibold mb-6 text-center text-blue-400">
              User Details
            </h4>
            <div className="space-y-4 text-lg">
              <p>
                <strong className="text-blue-400">Name:</strong>{" "}
                {data.data.firstName} {data.data.lastName}
              </p>
              <p>
                <strong className="text-blue-400">Email:</strong>{" "}
                {data.data.email}
              </p>
              <p>
                <strong className="text-blue-400">Age:</strong> {data.data.age}
              </p>
              <p>
                <strong className="text-blue-400">Gender:</strong>{" "}
                {data.data.gender}
              </p>
              <p>
                <strong className="text-blue-400">Country:</strong>{" "}
                {data.data.country}
              </p>
              <p>
                <strong className="text-blue-400">City:</strong>{" "}
                {data.data.city}
              </p>
              <p>
                <strong className="text-blue-400">Phone Number:</strong>{" "}
                {data.data.phoneNumber}
              </p>
              <p>
                <strong className="text-blue-400">Work:</strong>{" "}
                {data.data.work}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg">No user found with that ID.</p>
        )}
      </div>
    </div>
  );
};

export default SingleUserModal;
