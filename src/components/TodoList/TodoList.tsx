import React from 'react';
import classNames from 'classnames';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../Type/types';

type Props = {
  renderTodos: Todo[]
};

export const TodoList: React.FC<Props> = ({ renderTodos }) => {
  return (
    <section className="TodoList">
      <ul>
        {renderTodos.map(renderTodo => (
          <article
            data-id={renderTodo.id}
            className={classNames(
              'TodoInfo',
              { 'TodoInfo--completed': renderTodo.completed },
            )}
            key={renderTodo.id}
          >
            <TodoInfo renderTodo={renderTodo} />
          </article>
        ))}
      </ul>
    </section>
  );
};
