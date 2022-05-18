import React from 'react';
import { Todos } from '../../types/Todos';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import './TodoList.scss';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="TodoList__ul">
    {todos.map((todo) => (
      <li key={todo.id} className="TodoList__item">
        <TodoInfo
          title={todo.title}
          status={todo.completed}
          user={todo.user}
        />
      </li>
    ))}
  </ul>
);
