import React from 'react';
import { FullTodo } from '../../types/Todo';
import { TodoInfo } from '../TodoInfo';

type Props = {
  todos: FullTodo[],
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
