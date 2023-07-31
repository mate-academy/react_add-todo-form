const API_URL = 'https://mate.academy/students-api';

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export async function get<T>(endpoint: string): Promise<T> {
  await wait(500);
  const response = await fetch(API_URL + endpoint);

  if (!response.ok) {
    throw new Error(`Can't load from '${endpoint}'`);
  }

  return response.json();
}

export async function remove(endpoint: string): Promise<number> {
  await wait(500);

  const response = await fetch(API_URL + endpoint, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Can't load from '${endpoint}'`);
  }

  return response.json();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function post<T>(endpoint: string, data: any): Promise<T> {
  await wait(500);

  const response = await fetch(API_URL + endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  });

  if (!response.ok) {
    throw new Error(`Can't load from '${endpoint}'`);
  }

  return response.json();
}
