export type User = {
  id: number,
  name: string,
  username: string,
  email: string,
};

export type LinkedUsers = {
  [key: number]: User,
};
