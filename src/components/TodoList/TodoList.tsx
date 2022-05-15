import React from 'react';
import { Todos } from '../../types/Todos';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoInfo
            title={todo.title}
            completed={todo.completed}
            user={todo.user}
          />
        </li>
      ))}
    </ul>
  );
};
