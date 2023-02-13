import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo;
  deleteTodo: (todoId: number) => void;
};

export const TodoInfo: React.FC<Props> = ({ todo, deleteTodo }) => {
  const {
    id, completed, title, user,
  } = todo;

  return (
    <article
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <button type="button" onClick={() => deleteTodo(id)}>
        x
      </button>

      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && (
        <UserInfo user={user} />
      )}
    </article>
  );
};
