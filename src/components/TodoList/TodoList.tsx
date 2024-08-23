import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';
import Todo from '../../types/Todo';

interface TodoProps {
  todos: Todo[];
}

export const TodoList: React.FC<TodoProps> = ({ todos }) => (
  <section className="TodoList">
    {todos.map((todo: Todo) => (
      <TodoInfo todo={todo} key={todo.id} />
    ))}
  </section>
);
