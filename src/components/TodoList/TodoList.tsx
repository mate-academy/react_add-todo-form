import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoListProps } from '../../types/types';

export const TodoList: React.FC<TodoListProps> = ({ todos, users }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} users={users} />
    ))}
  </section>
);
