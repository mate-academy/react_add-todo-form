import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => (

  <ul className="block">
    {todos.map(todo => (
      <li key={todo.id} className="box">
        <TodoInfo todo={todo} />
      </li>
    ))}
  </ul>
);
