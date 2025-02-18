import React from 'react';
import { TodoWithUsers } from '../../type/TodoWithUsers';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: TodoWithUsers[];
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
