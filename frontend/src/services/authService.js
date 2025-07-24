export const loginUser = async (data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "POST",

    // Ensure the API URL is set in your environment variables
    // This is the endpoint for user login
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  // Check if the response is ok (status in the range 200-299)
  if (!res.ok) {
    throw new Error("Failed to login");
  }

  return res.json();
};
