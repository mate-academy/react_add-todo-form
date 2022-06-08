import React from 'react';
import { Todo } from '../../react-app-env';

interface Props {
  todos: Todo[],
}

export const TodoList: React.FC<Props> = ({ todos }) => (
  <ul className="row d-flex justify-content-start mt-4 mb-4">
    {todos.map(todo => (
      <div key={todo.id} className="col-4 mb-4">
        <li className="card p-2">
          <h3>{todo.title}</h3>
          <p>{`id: ${todo.id}`}</p>
          <p>{`User id: ${todo.userId}`}</p>
          <p>{`completed: ${todo.completed}`}</p>
        </li>
      </div>
    ))}
  </ul>
);
