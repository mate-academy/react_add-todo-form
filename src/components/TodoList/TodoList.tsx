import React from 'react';
import classNames from 'classnames';

import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[]
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          key={todo.id}
          data-id="1"
          className={classNames(
            'TodoInfo',
            {
              'TodoInfo--completed': todo.completed,
            },
          )}
        >
          <TodoInfo todo={todo} />
        </article>
      ))}
    </section>
  );
};
