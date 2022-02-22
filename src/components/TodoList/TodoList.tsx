import React from 'react';
import { PreparedTodos } from '../../types/PreparedTodos';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: PreparedTodos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="Todo_list">
    {todos.map(todo => (
      <li key={todo.id} className="Todo_list__item">
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
