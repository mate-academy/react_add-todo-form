import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  preparedTodo: Todo[];
};

export const TodoList: React.FC<Props> = ({ preparedTodo }) => (
  <ul className="todo__list">
    {preparedTodo.map(todo => (
      <li className="todo__item" key={todo.id}>
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
