import React from 'react';

import { TodoInfo } from './TodoInfo';

type Props = {
  todoItems: PreparedTodos[];
};

export const TodoList: React.FC<Props> = ({ todoItems }) => (
  <ul className="list">
    {
      todoItems.map(item => (
        <li className="item" key={item.id}>
          <TodoInfo {...item} />
        </li>
      ))
    }
  </ul>
);
