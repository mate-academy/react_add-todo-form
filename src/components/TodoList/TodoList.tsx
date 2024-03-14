import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { TodoInterface } from '../../types/TodoInterface';

interface Props {
  todos: TodoInterface[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: TodoInterface) => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
