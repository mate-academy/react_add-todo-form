import React from 'react';
import cn from 'classnames';
import { TodoWithUser } from '../../react-app-env';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoWithUser;
  deleteTodo: (todoId: number) => void
};

export const TodoInfo: React.FC<Props> = ({ todo, deleteTodo }) => (
  <article
    data-id={todo.id}
    className={cn('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <button
      type="button"
      onClick={() => deleteTodo(todo.id)}
    >
      x
    </button>

    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && (
      <UserInfo user={todo.user} />
    )}
  </article>
);
