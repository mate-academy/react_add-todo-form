import { ITodo } from './ITodo';
import { IUser } from './IUser';

export interface INewTodo extends ITodo {
  user?: IUser;
}
