import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoListProps, Todo } from './TodoList.types';

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
