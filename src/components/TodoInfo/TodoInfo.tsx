import classNames from 'classnames';
import { ToDoWithUser } from '../../Types/ToDoWithUser';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: ToDoWithUser;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
