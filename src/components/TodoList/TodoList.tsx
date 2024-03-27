import React from 'react';
import { TodoInfo } from '../TodoInfo';

interface TodoGeneral {
  id: number;
  title: string;
  completed: boolean;
  name?: string;
  email?: string;
}

export const TodoList: React.FC<{
  todosFromServer: TodoGeneral[];
}> = ({ todosFromServer }) => {
  return (
    <section className="TodoList">
      {todosFromServer.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
