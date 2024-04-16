import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          data-id={todo.id}
          key={todo.id}
          className={classNames(
            { 'TodoInfo--completed': todo.completed },
            'TodoInfo',
          )}
        >
          <h2 className="TodoInfo__title">{todo.title}</h2>

          <a className="UserInfo" href={todo.user?.email}>
            {todo.user?.name}
          </a>
        </article>
      ))}
    </section>
  );
};
