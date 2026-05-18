import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { User } from '../UserInfo';

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
  user: User;
}

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
