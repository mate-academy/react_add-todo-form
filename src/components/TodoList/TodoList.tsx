import React from 'react';
import { Todo } from '../../types/types';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="list">
    {todos.map(preparedTodo => (
      <li key={preparedTodo.id} className="list__item">
        <TodoInfo todo={preparedTodo} />
      </li>
    ))}
  </ul>
);
