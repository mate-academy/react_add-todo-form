import { Todo } from '../../type/todo';
import { User } from '../../type/user';

type Props = {
  users: Array<User>
  todo: Todo
};

export const UserInfo = ({ users, todo }: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${users.find(user => user.id === todo.userId)?.email}`}>
      {users?.find(user => user.id === todo.userId)?.name}
    </a>
  );
};
