import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, user, completed } = todo;

  return (
    <article
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
