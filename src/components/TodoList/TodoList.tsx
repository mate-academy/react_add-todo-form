import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../Types/Types';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map((todo: Todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};
