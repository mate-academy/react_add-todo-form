import classNames from 'classnames';
import React from 'react';
import { Todo } from '../types/Todo';
import { TodoInfo } from './TodoInfo';

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todoList">
      {todos.map(todo => {
        return (
          <li
            key={todo.id}
            className={classNames('todoList__item', {
              'todoList__item--g': todo.completed,
              'todoList__item--r': !todo.completed,
            })}
          >
            <TodoInfo todo={todo} />
          </li>
        );
      })}
    </ul>
  );
};

type Props = {
  todos: Todo[]
};
