import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import users from '../../api/users';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';

type Props = {
  todo: Todo
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const todoOwner: User | undefined
  = users.find((user) => user.id === todo.userId);

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

      {users.map((user) => (user === todoOwner && (
        <UserInfo user={todoOwner} key={todoOwner.id} />
      )))}
    </article>
  );
};
