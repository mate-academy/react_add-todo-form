type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const getUserById = (users: User[], id: number) => {
  return users.find(user => user.id === id) || null;
};
