import React from 'react';
import { TodoInfo } from '../TodoInfo';

type Togo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

interface Props {
  todos: Togo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
