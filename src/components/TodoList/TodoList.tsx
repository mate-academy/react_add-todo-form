import React from 'react';
import { Todos } from '../../react-app-env';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todos[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      { todos.map((todo) => (
        <TodoInfo todo={todo} />
      ))}
    </section>
  );
};
