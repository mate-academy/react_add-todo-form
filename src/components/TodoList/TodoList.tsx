import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoWithUser } from '../../types';

interface TodoListProps {
  todos: TodoWithUser[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section>
      {todos.map((todo) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
