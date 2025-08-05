import { BASE_URL } from '@/config/api';
import { catchAsync } from '@/utils/catchAsync';

export async function verifyIp() {
  return await catchAsync(async () => {
    const res = await fetch(`${BASE_URL}/api/v1/ips/verify-ip`);
    const data = await res.json();
    return data.allowed;
  })();
};