import React from 'react';
import { TodoInfo } from '../TodoInfo';

type Todos = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Users = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type TodoListProps = {
  todos: Todos[];
  users: Users[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => {
  return (
    <section className="TodoList">
      {todos.map((todo) => (
        <TodoInfo
          todo={todo}
          users={users}
        />
      ))}
    </section>
  );
};
