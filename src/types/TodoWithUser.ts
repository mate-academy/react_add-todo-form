import Todo from './Todo';
import User from './User';

export default interface TodoWithUser extends Todo {
  user: User | null;
}
