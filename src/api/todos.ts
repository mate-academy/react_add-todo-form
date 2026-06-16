import type { User } from './users';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

const todos: Todo[] = [
  {
    
    id: 1,
    title: 'delectus aut autem',
    completed: true,
    userId: 1,
    user: {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
    },
  },
  {
    id: 15,
    title: 'some other todo',
    completed: false,
    userId: 1,
    user: {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'johndoe@example.com',
    },
  },
  {
    id: 2,
    title: 'quis ut nam facilis et officia qui',
    completed: false,
    userId: 4,
    user: {
      id: 4,
      name: 'Jane Smith',
      username: 'janesmith',
      email: 'janesmith@example.com',
    },
  },
];

export default todos;
