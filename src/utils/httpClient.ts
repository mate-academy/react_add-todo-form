const API_URL = 'https://mate.academy/students-api';

export const httpClient = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(API_URL + endpoint);

    if (!response.ok) {
      throw new Error(`Can't load from '${endpoint}'`);
    }

    return response.json();
  },
};
