import ToDo from '../../types/ToDo';
import { UserInfo } from '../UserInfo';
import cn from 'classnames';
import usersFromServer from '../../api/users';

interface Props {
  todo: ToDo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, id, userId } = todo;

  const foundUser = usersFromServer.find(
    checkedUser => checkedUser.id === userId,
  );

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {foundUser && <UserInfo user={foundUser} />}
    </article>
  );
};
