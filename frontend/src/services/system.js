import { BASE_URL } from '@/config/api';
import { catchAsync } from '@/utils/catchAsync';

// CREATE
export async function createSystem({systemid, hostname, ip_address, loc, protocol, port, tmeout, username, pw, domainid}) {
  return catchAsync(async () => {
    const response = await fetch(`${BASE_URL}/api/v1/systems/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemid,
        hostname,
        ip_address,
        loc,
        protocol,
        port,
        tmeout,
        username,
        pw,
        domainid
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to create system');
    }
    return response.json();
  })();
};

// UPDATE 
export async function updateSystem({systemid, hostname, ip_address, loc, protocol, port, tmeout, username, pw, domainid}) {
  return catchAsync(async () => {
    const response = await fetch(`${BASE_URL}/api/v1/systems/${systemid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemid,
        hostname,
        ip_address,
        loc,
        protocol,
        port,
        tmeout,
        username,
        pw,
        domainid
      }),
    });
    if (!response.ok) {
      const text = await response.text();
      throw new Error("Failed to update system: " + text);
    }
    return response.json();
  })();
};

// DELETE
export async function deleteSystem(systemid) {
  return catchAsync(async () => {
    const response = await fetch(`${BASE_URL}/api/v1/systems/${systemid}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete system');
    }
    return response.json();
  })();
};

// GET 
export async function getSystem(systemid) {
  return catchAsync(async () => {
    const response = await fetch(`${BASE_URL}/api/v1/systems/${systemid}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch system');
    }
    return response.json();
  })();
};

// GET ALL
export async function getAllSystems() {
  return catchAsync(async () => {
    const response = await fetch(`${BASE_URL}/api/v1/systems`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch systems');
    }
    return response.json();
  })();
};
