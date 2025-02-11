import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface Todos {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Props {
  todos: Todos[];
  users: Users[];
}

export const TodoList: React.FC<Props> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} users={users} todo={todo} />
      ))}
    </section>
  );
};
