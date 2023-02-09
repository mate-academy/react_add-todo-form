import React from 'react';
import { Todo } from '../../types/todoType';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[],
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="TodoList">
      {todos.map((todo) => (
        <TodoInfo todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
