export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
}

const todos: Todo[] = [
  {
    id: 1,
    title: 'delectus aut autem',
    completed: true,
    userId: 1,
    user: null,
  },
  {
    id: 15,
    title: 'some other todo',
    completed: false,
    userId: 1,
    user: null,
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
    userId: 4,
    user: null,
  },
];

export default todos;
