import React from 'react';
import { TodoInfoType } from '../../types/TodoInfoType';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: TodoInfoType[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo key={todo.id} todo={todo} />
      ))}
    </section>
  );
};
