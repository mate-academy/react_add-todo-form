import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Post } from '../../types/post';

type TodoListProps = {
  todos: Post[];
};

export const TodoList: React.FC<TodoListProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
