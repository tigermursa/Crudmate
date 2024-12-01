export const getSingleUserById = async (uid) => {
  try {
    const result = await fetch(`http://localhost:5000/api/v1/get-user/${uid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result.ok) {
      throw new Error(`Error: ${result.statusText}`);
    }

    const data = await result.json();

    return data;
  } catch (error) {
    console.error(`Error fetching user with uid ${uid}:`, error);
    throw error;
  }
};
