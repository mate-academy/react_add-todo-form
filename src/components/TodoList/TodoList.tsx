import React from 'react';
import classNames from 'classnames';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../react-app-env';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <>
    {todos.map(todo => (
      <article
        key={todo.id}
        data-id={todo.id}
        className={classNames(
          'TodoInfo',
          { 'TodoInfo--completed': todo.completed },
        )}
      >
        <TodoInfo todo={todo} />
      </article>
    ))}
  </>
);
