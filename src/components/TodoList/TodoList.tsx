import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user: User;
}

interface Props {
  todoList: Todo[];
}

export const TodoList: React.FC<Props> = ({ todoList }) => {
  return (
    <section className="TodoList">
      {todoList.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </section>
  );
};
