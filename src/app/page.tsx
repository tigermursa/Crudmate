import { getAllUsers } from "@/lib/getAllUsers";
import { user } from "@/types/types";

const Home = async () => {
  const users = await getAllUsers();

  console.log(users);

  return (
    <div>
      <h3>All the users</h3>
      <div>
        {users?.data?.map((user: user) => (
          <div key={user?.uid}>
            {/* Use `uid` as a unique key */}
            <p>
              <strong>Name:</strong> {user.firstName} {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Country:</strong> {user.country}
            </p>
            <p>
              <strong>City:</strong> {user.city}
            </p>
            <p>
              <strong>Phone Number:</strong> {user.phoneNumber}
            </p>
            <p>
              <strong>Work:</strong> {user.work}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
