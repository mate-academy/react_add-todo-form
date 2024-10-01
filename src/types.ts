export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: User['id'];
  // function getUserById from App can return null if user not found so we should consider it
  user?: User | null;
};
