export const getAllUsers = async () => {
  try {
    // Perform the API call
    const result = await fetch("http://localhost:5000/api/v1/get-all-users", {
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
    console.error("Error fetching users:", error);
    throw error;
  }
};
