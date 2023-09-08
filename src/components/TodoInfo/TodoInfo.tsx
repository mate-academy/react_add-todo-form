import React from 'react';
import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
  deleteTodo: (todoId: number) => void,
  toggleTodoCompletion: (todoId: number) => void
};

export const TodoInfo: React.FC<Props> = ({
  todo,
  deleteTodo,
  toggleTodoCompletion,
}) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;

  return (
    <article
      key={id}
      data-id={id}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo user={user} />

      <button
        className="button"
        onClick={() => deleteTodo(id)}
        type="button"
      >
        X
      </button>

      <span className="status__todo">
        <input
          onClick={() => toggleTodoCompletion(id)}
          type="checkbox"
          className="checkbox"

        />
        <p>Change status todo</p>
      </span>

    </article>
  );
};
