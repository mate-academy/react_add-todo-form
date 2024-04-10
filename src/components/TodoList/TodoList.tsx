import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../types/Todo';
import React from 'react';

export const TodoList = ({ todos }: Props) => {
  return (
    <section>
      {todos.map(todo => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </section>
  );
};

type Props = {
  todos: Todo[];
};
