import { User } from './UserType';

type TodoItem = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type TodoWithUserItem = TodoItem & {
  user: User | null;
};

export type { TodoItem, TodoWithUserItem };
