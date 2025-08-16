export interface ITodos {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  // user: IUsers[];
}

export interface IUsers {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface ITodosWithUsers {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: IUsers;
}
// import { User } from './User';

// export type UserWithTodos = {
//   todoId: number;
//   user: User;
//   title: string;
//   completed: boolean;
// };

// export interface IRenderedData {
//   todos: ITodos[]
//   users: IUsers[]
// }
