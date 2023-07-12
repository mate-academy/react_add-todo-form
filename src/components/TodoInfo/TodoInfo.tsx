import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import users from '../../api/users';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {users.map((user) => (user.id === todo.userId && (
        <UserInfo user={user} key={user.id} />
      )))}
    </article>
  );
};
