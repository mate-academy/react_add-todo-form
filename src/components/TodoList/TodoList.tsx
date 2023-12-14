import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          data-id={todo.id}
          className={classNames('TodoInfo', {
            'TodoInfo--completed': todo.completed,
          })}
        >
          <h2 className="TodoInfo__title">
            {todo.title}
          </h2>

          <a className="UserInfo" href={todo.user?.email}>
            {todo.user?.name}
          </a>
        </article>
      ))}
    </section>
  );
};
