/* eslint-disable no-console */
import classNames from 'classnames';
import React, { useContext } from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import { TodosContext } from '../TodosProvider';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = React.memo((
  { todo },
) => {
  const { deleteTodo } = useContext(TodosContext);

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && (
        <UserInfo user={todo.user} />
      )}

      <button
        className="TodoInfo__button"
        type="button"
        onClick={() => deleteTodo(todo.id)}
      >
        x
      </button>
    </article>
  );
});
