import { Good } from '../types/Good';

const BASE_URL = 'https://mate.academy/students-api/goods';

export const getGoods = async (): Promise<Good[]> => {
  let response;

  try {
    response = await fetch(BASE_URL);
  } catch (error) {
    throw new Error('Cant fetch goods from server');
  }

  return response.json();
};

export const addGood = async (name: string, color: string | null) => {
  try {
    await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ name, color }),
    });
  } catch (error) {
    throw new Error('Cant add new good to the server');
  }
};

export const deleteGood = async (id: number) => {
  try {
    await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
  } catch (error) {
    throw new Error('Cant delete good from the server');
  }
};
