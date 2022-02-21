import React from 'react';

import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';
import { Todo } from '../../data/Todo';

type Props = {
  todoList: Todo[];
};

export const TodoList: React.FC<Props> = ({ todoList }) => (
  <ul className="todoList">
    {todoList.map(todo => (
      <li key={todo.id}>
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
