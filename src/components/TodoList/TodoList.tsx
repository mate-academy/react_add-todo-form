import React from 'react';
import { TodoGeneral, TodoInfo } from '../TodoInfo';

export const TodoList: React.FC<{
  todos: TodoGeneral[];
}> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
