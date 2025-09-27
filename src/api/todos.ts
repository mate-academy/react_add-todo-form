import type { User } from './users';

export type TodoBase = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

export type Todo = TodoBase & { user: User };

export type NewTodo = Omit<Todo, 'id' | 'completed' | 'user'>;

export const todos: TodoBase[] = [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: true,
    userId: 1,
  },
  {
    id: 15,
    title: 'some other todo',
    completed: false,
    userId: 1,
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
    userId: 4,
  },
];

export default todos;
