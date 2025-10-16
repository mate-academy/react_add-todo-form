import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../types/TodoWithUser';

type Props = {
  todos?: TodoWithUser[] | null;
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  if (!todos || todos.length === 0) {
    return <p className="TodoList--empty">No todos available</p>;
  }

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
