import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todoItem: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todoItem }) => {
  const {
    title,
    completed,
    user,
  } = todoItem;

  return (
    <article
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
      data-id={todoItem.id}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
