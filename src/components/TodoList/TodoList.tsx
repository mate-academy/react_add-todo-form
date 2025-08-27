import React from 'react';
import { TodoInfo } from '../TodoInfo';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user: User;
};

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
