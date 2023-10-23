import cn from 'classnames';

import { UserInfo } from '../UserInfo';

import { Todo } from '../../types/Todo';

import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={usersFromServer.find(user => user.id === todo.userId)} />
    </article>
  );
};
