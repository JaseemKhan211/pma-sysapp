import { BASE_URL } from '@/config/api';
import { catchAsync } from '@/utils/catchAsync';

export async function connectSystem({ systemid }) {
  return catchAsync(async () => {
    const response = await fetch(`${BASE_URL}/api/v1/guac/connect/${systemid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to connect system");
    }

    return response.json();
  })();
}