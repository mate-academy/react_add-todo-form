import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoInfo todo={todo} />
        </li>
      ))}
    </ul>
  );
};
