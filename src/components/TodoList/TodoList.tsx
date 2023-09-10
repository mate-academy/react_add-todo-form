import React from 'react';
import { User } from '../../interfaces/user';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: {
    todoUser: User | undefined;
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  }[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
