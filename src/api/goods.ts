import { Good } from '../types/Good';

const BASE_URL = 'https://mate.academy/students-api/goods';

export const getGoods = async (): Promise<Good[]> => {
  let response;

  try {
    response = await fetch(BASE_URL);

    if (!response.ok) {
      throw new Error('test');
    }
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('error', error.message);
    throw new Error('Cant fetch goods from server');
  }

  return response.json();
};

export const getGoodById = async (id: number): Promise<Good> => {
  let response;

  try {
    response = await fetch(`${BASE_URL}/${id}`);

    if (!response.ok) {
      throw new Error('test');
    }
  } catch (error: any) {
    // eslint-disable-next-line no-console
    console.log('error', error.message);
    throw new Error('Cant fetch good from server');
  }

  return response.json();
};

export const addGood = async (name: string, color: string | null) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ name, color }),
    });

    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    throw new Error('Cant add new good to the server');
  }
};

export const deleteGood = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    throw new Error('Cant delete good from the server');
  }
};

export const editGoodColor = async (id: number, color: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ color }),
    });

    if (!response.ok) {
      throw new Error();
    }
  } catch (error) {
    throw new Error('Cant edit good on the server');
  }
};
