import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoInterface } from '../../types/Todo';

interface TodoListProps {
  todos: TodoInterface[];
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodosList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
