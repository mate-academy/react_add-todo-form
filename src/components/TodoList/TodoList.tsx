import React from 'react';
import { Todo } from '../../types/Todo';
import { TodoItem } from '../TodoItem/TodoItem';

import './TodoList.scss';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="todoList">
      {todos.map(item => (
        <li className="todoItem" key={item.id}>
          <TodoItem todo={item} />
        </li>
      )).reverse()}
    </ul>
  );
};
