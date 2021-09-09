import React from 'react';
import classNames from 'classnames';

import './TodoList.scss';

import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todoList: PreparedTodo[];
};

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <ul className="todoList">
      {todoList.map(todo => (
        <li
          className={classNames('todoList__item', {
            'todoList__item--completed': todo.completed,
          })}
          key={todo.id}
        >
          <TodoInfo todoData={todo} />
        </li>
      ))}
    </ul>
  );
};
