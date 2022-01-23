import React from 'react';
import { TodoCard } from '../TodoCard/TodoCard';

import './TodoList.scss';

interface Props {
  todoList: TodoWithUser[],
}

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <li className="todo-list__item" key={todo.id}>
          <TodoCard todoItem={todo} />
        </li>
      ))}
    </ul>
  );
};
