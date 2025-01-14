import React from 'react';
import { TodoInfo } from '../TodoInfo';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  todos: Todo[];
  users: User[];
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section>
      {todos.map(todo => {
        const user = users.find(u => u.id === todo.userId);

        return <TodoInfo key={todo.id} todo={todo} user={user} />;
      })}
    </section>
  );
};
