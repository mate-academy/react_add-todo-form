import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoListProps } from '../../interfaces';

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  if (!todos) {
    return null;
  }

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
