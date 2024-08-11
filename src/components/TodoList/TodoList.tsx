import { TodoUser } from '../../interfaces';
import React from 'react';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoUser[];
};
export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: TodoUser) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
