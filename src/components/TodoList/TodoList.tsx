import React from 'react';
import classNames from 'classnames';
import { Todo } from '../Todo';
import { TypeTodo } from '../../types';

import './TodoList.scss';

type Props = {
  todos: TypeTodo[],
};

const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="todo-list">
    {todos.map(todo => (
      <li
        key={todo.id}
        className={classNames(
          'todo-item',
          'todo-list__item',
          { 'todo-item--complete': todo.completed },
        )}
      >
        <Todo {...todo} />
      </li>
    ))}
  </ul>
);

export { TodoList };
