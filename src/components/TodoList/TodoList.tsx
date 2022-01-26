import React from 'react';
import './TodoList.scss';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: PreparedTodo[];
};

export const TodoList:React.FC<Props> = ({ todos }) => (
  <ul className="list">
    {todos.map(todo => (
      <li key={todo.id} className="list__item">
        <TodoInfo {...todo} />
      </li>
    ))}
  </ul>
);
