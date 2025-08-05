import { BASE_URL } from '@/config/api';
import { catchAsync } from '@/utils/catchAsync';

export async function login({ usrid, pw }) {
  return await catchAsync(async () => {
    const res = await fetch(`${BASE_URL}/api/v1/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usrid, pw })
    });

    if (!res.ok) throw new Error('Login failed');

    const data = await res.json();
    return data;
  })();
};