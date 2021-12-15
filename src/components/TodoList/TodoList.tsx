import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/Todo';
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
