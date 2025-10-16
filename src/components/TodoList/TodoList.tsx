import React from 'react';
import { UsersAndTodos } from '../../types/UsersAndTodos';
import { TodoInfo } from '../TodoInfo';

type TodoListProps = {
  todos: UsersAndTodos[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
