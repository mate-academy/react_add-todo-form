import React from 'react';
import { TodoListProps } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

export const TodoList: React.FC<TodoListProps> = ({ todos = [] }) => (
  <section className="TodoList">
    {todos.length ? (
      todos.map(todo => <TodoInfo key={todo.id} todo={todo} />)
    ) : (
      <div>No todos</div>
    )}
  </section>
);
