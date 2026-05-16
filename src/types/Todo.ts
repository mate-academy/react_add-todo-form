import { User } from './User';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type TodoAggregated = Todo & {
  user: User | null;
};

export type { Todo, TodoAggregated };
