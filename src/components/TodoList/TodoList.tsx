import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { TodoPrepared } from '../../types/TodoPrepared';

import './TodoList.scss';

type Props = {
  todoList: TodoPrepared[];
};

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <ul className="todoList">
      {
        todoList.map(item => (
          <li className="todoList__item" key={item.id}>
            <TodoInfo {...item} />
          </li>
        ))
      }
    </ul>
  );
};
