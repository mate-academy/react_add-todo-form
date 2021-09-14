import React from 'react';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <>
      <ul className="list-group">
        {todos.map(todo => (
          <li className="list-group-item d-flex justify-content-between" key={todo.id}>
            <TodoInfo todo={todo} />
          </li>
        ))}
      </ul>
    </>
  );
};
