import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import { ToDoWithUser } from '../../types';

interface TodoListProps {
  todos: ToDoWithUser[];
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
