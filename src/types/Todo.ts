import { User } from './User';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User | null; // Optional user property
};

// export type TodoWithUser = {
//   id: number;
//   title: string;
//   completed: boolean;
//   userId: number;
//   user: User;
// };
