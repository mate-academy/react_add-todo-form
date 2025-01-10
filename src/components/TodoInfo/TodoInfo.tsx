import { Todo } from '../../type/todo';
import usersFromServer from '../../api/users';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, userId } = todo;

  const user = usersFromServer.find(el => el.id === userId);

  return (
    <article
      data-id={id}
      key={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
