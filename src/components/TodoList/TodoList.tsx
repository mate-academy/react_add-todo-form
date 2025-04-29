import { TodoInfo } from '../TodoInfo/TodoInfo';
import { Todo } from '../../types/todo';
import React from 'react';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <section className="TodoList">
    {todos.map(todo => (
      <TodoInfo key={todo.id} todo={todo} />
    ))}
  </section>
);
