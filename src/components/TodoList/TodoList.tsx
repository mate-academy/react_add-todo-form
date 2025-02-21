import React from 'react';
import { TodoInfo } from '../TodoInfo';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
