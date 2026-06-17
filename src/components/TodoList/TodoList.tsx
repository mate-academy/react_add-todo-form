import React from 'react';
import { TodoInfo } from '../TodoInfo';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

type Props = {
  todos: Todo[];
  users: User[];
};

export const TodoList: React.FC<Props> = ({ todos = [], users = [] }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => {
        const currentUser = users.find(user => user.id === todo.userId);

        return <TodoInfo key={todo.id} todo={todo} user={currentUser} />;
      })}
    </section>
  );
};
