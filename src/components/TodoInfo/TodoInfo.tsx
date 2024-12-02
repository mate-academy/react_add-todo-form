import { FC } from 'react';
import { Todo } from '../../types/Todo';

import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  todo: Todo;
}

export const TodoInfo: FC<TodoInfoProps> = ({ todo }) => {
  // const user = usersFromServer.find(({ id }) => id === todo.userId);

  // if (!user) {
  //   return null;
  // }

  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
