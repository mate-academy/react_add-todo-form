export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type ServerTodo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export type Todo = ServerTodo & {
  user: User;
};
