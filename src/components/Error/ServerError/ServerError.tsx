import { FaExclamationTriangle } from "react-icons/fa";

const ServerError = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700 px-4">
      <div className="bg-gray-200 shadow-lg rounded-lg p-8 max-w-md text-center flex flex-col justify-center items-center">
        <div className="text-red-500 text-6xl">
          <FaExclamationTriangle />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mt-4">
          Oops! Something went wrong.
        </h1>
        <p className="text-gray-600 mt-2">
          Our servers are currently experiencing some issues. Please try again
          later or contact support.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};

export default ServerError;
