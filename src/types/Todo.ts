// import { User } from './User';

import { User } from './User';

export interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}

// export interface Todo {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
//   user: {
//     id: number;
//     name: string;
//     username: string;
//     email: string;
//   };
// }
