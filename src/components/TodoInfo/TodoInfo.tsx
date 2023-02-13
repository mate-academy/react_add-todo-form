import { UserInfo } from '../UserInfo/UserInfo';
import usersFromServer from '../../api/users';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
};

function getUser(userId: number):User | undefined {
  const foundUser = usersFromServer.find(user => userId === user.id);

  return foundUser || undefined;
}

export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const {
    title,
    userId,
  } = todo;

  return (
    <>
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={getUser(userId)} />
    </>
  );
};
