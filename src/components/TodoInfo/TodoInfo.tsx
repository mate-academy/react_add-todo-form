import { FC } from 'react';
import { Todo } from '../../types/todosTypes';
import { UserInfo } from '../UserInfo';

type Props = { todo: Todo };

export const TodoInfo: FC<Props> = ({ todo }) => {
  if (!todo || !todo.user) {
    return null;
  }

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
