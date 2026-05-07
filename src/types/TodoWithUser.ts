import { User } from './User';
import { Nullable } from './Nullable';

export interface TodoWithUser {
  id: number;
  title: string;
  completed: boolean;
  userId: User['id'];
  user: Nullable<User>;
}
