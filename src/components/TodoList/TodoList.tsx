import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../type/Todo';

interface TodoListProps {
  todos: Todo[]; // Правильний тип
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
