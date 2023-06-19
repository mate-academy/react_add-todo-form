import { User } from '../../types/User';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';

export const UserInfo = ({ todo }: { todo: Todo }) => {
  const findUser = usersFromServer.find((user: User) => (
    user.id === todo.userId
  ));

  return (
    <a className="UserInfo" href={`mailto:${findUser ? findUser.email : null}`}>
      {findUser ? findUser.name : null}
    </a>
  );
};
