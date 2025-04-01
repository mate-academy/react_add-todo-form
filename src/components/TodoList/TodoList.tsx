import { TodoInfo } from '../TodoInfo';
import React from 'react';
import { TodoProps } from '../../todoProps';

interface Props {
  todos: TodoProps[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      {todos.map(todo => {
        return <TodoInfo key={todo.id} todo={todo} />;
      })}
    </>
  );
};
