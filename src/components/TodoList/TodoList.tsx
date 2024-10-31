import React from 'react';
import { Todo } from '../../types/todo';
import { TodoInfo } from '../TodoInfo';

interface TodListProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
