import React from 'react';
import { TodoListProps } from '../../Types';
import { TodoInfo } from '../TodoInfo';

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
