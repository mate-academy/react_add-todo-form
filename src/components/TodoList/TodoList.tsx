import React from 'react';
import { Todo } from '../../App';
import { TodoInfo } from '../TodoInfo';

type P = {
  todos: Todo[];
};

export const TodoList: React.FC<P> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
