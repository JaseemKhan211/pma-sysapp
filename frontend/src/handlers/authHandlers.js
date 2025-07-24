import { loginUser } from "@/services/authService";

export const handleLogin = async (e, usrid, password) => {
  e.preventDefault();
  const data = { usrid, password };

  try {
    const response = await loginUser(data);
    console.log("Login success:", response);
    return response;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};
