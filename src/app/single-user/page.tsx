"use client";
import { useState } from "react";
import { getSingleUserById } from "@/lib/getSingleUserById";
import { user } from "@/types/types"; // Assuming the interface is defined correctly

// Modify the userData type to account for the `.data` wrapper
interface UserResponse {
  data: user; // user data is inside the `data` field
}

const SingleUser = () => {
  const [uid, setUid] = useState<string>(""); // State to store the uid input
  const [userData, setUserData] = useState<UserResponse | null>(null); // State to store the fetched user data
  const [error, setError] = useState<string | null>(null); // State to handle errors

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUid(e.target.value); // Update the uid state as the user types
  };

  const fetchUserData = async () => {
    if (uid) {
      try {
        const response = await getSingleUserById(uid); // Fetch user data using the uid
        setUserData(response); // Set the user data in the state
        setError(null); // Reset error state if successful
      } catch (err) {
        console.log(err);
        setError("User not found or an error occurred.");
        setUserData(null); // Reset user state on error
      }
    } else {
      setError("Please enter a valid UID.");
      setUserData(null); // Reset user state
    }
  };

  return (
    <div>
      <h3>Search for a User</h3>
      <input
        type="text"
        value={uid}
        onChange={handleInputChange}
        placeholder="Enter UID"
      />
      <button onClick={fetchUserData}>Search</button>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Show error message */}
      {userData ? (
        <div>
          <h4>User Details</h4>
          <p>
            <strong>Name:</strong> {userData.data.firstName}{" "}
            {userData.data.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userData.data.email}
          </p>
          <p>
            <strong>Age:</strong> {userData.data.age}
          </p>
          <p>
            <strong>Gender:</strong> {userData.data.gender}
          </p>
          <p>
            <strong>Country:</strong> {userData.data.country}
          </p>
          <p>
            <strong>City:</strong> {userData.data.city}
          </p>
          <p>
            <strong>Phone Number:</strong> {userData.data.phoneNumber}
          </p>
          <p>
            <strong>Work:</strong> {userData.data.work}
          </p>
        </div>
      ) : (
        " "
      )}
    </div>
  );
};

export default SingleUser;
