import React from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo } from '../../api/todos';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map((todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </>
  );
};
