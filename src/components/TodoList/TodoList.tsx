import React from 'react';
import { UpdatedTodo } from '../../types/UpdatedTodo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: UpdatedTodo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(el => {
        return <TodoInfo key={el.id} todo={el} />;
      })}
    </section>
  );
};
