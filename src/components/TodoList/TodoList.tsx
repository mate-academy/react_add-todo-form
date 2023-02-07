import React from 'react';
import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">

      {todos.map(todo => {
        return <TodoInfo todo={todo} key={todo.id} />;
      })}

    </section>
  );
};
