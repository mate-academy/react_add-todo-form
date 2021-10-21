import React from 'react';
import { TodoInfo } from './TodoInfo';
import { Todo } from './Todo';

type Props = {
  todos: Todo[];
};

export const TodoList:React.FC<Props> = ({ todos }) => {
  return (
    <ul className="list-group">
      {todos.map(todo => (
        <TodoInfo todo={todo} />
      ))}
    </ul>
  );
};
