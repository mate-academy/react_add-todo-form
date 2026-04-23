import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../type/Todo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos &&
        todos.map(oneTodo => {
          return <TodoInfo key={oneTodo.id} todo={oneTodo} />;
        })}
    </section>
  );
};
