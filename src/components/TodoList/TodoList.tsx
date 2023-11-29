import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todos } from '../../types/TodosUsers';

interface TodoListProps {
  todos: Todos[]
}

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
