import { Good } from '../types/Good';

const BASE_URL = 'http://localhost:5000/goods';

export const getAllGoods = async (): Promise<Good[]> => {
  const response = await fetch(BASE_URL);

  return response.json();
};

export const getGoodById = async (goodId: number): Promise<Good> => {
  const response = await fetch(`${BASE_URL}/${goodId}`);

  return response.json();
};

export const addNewGood = async (
  name: string, colorId: number,
): Promise<Good> => {
  const newGood = {
    name,
    colorId,
  };

  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newGood),
  });

  return response.json();
};

export const deleteGood = async (goodId: number) => {
  await fetch(`${BASE_URL}/${goodId}`, {
    method: 'DELETE',
  });
};
