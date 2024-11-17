import React from 'react';
import { TODO } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

interface Props {
  todos: TODO[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList section">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
