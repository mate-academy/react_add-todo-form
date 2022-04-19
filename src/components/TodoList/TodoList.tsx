import React from 'react';

import { Todo } from '../../types/ToDo';
import { TodoInfo } from '../TodoInfo/TodoInfo';

import './TodoList.scss';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = React.memo(
  ({ todos }) => (
    <div className="todo">
      <ul className="todo__list">
        {todos.map((todoItem) => (
          <li
            className={
              todoItem.completed
                ? 'todo__item'
                : 'todo__item todo__item--compl'
            }
            key={todoItem.id}
          >
            <TodoInfo {...todoItem} />
          </li>
        ))}
      </ul>
    </div>
  ),
);
