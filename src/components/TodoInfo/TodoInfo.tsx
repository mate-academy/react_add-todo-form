import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import { getUserById } from '../../utils/todoUtiles';
import users from '../../api/users';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = getUserById(users, todo.userId);

  return (
    <article
      data-id={todo.id}
      className={
        classNames('TodoInfo', { 'TodoInfo--completed': todo.completed })
      }
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {user && <UserInfo user={user} />}

    </article>
  );
};
