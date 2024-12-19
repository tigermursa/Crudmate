import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen container-bg-design ">
      {/* Google Logo */}
      <div className="text-5xl font-semibold text-blue-500 flex items-center space-x-1">
        <span className="text-blue-500">C</span>
        <span className="text-red-500">R</span>
        <span className="text-yellow-500">U</span>
        <span className="text-blue-500">D</span>
        <span className="text-green-500">M</span>
        <span className="text-red-500">A</span>
        <span className="text-yellow-500">T</span>
        <span className="text-blue-500">E</span>
      </div>

      {/* Search Bar */}
      <div className="mt-8 w-full max-w-lg ">
        <form className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-4 pl-6 pr-10 border border-gray-300 rounded-full font-bold shadow-sm focus:outline-none"
          />
          <button
            type="submit"
            className="absolute top-1/2 right-4 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <BsSearch />
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-[50%] text-center py-4  text-gray-50 text-sm ">
        <p>Tailwind is love</p>
      </footer>
    </div>
  );
};

export default Search;
