import React from 'react';
import { TodoWithUser } from '../../types';
import { TodoInfo } from '../TodoInfo';

interface TodoListProps {
  todos: TodoWithUser[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
