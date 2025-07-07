import React from 'react';
import { Todo } from '../types/types';
import { TodoInfo } from '../TodoInfo';

interface TDList {
  todos: Todo[];
}

export const TodoList: React.FC<TDList> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
