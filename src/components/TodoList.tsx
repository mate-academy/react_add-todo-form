import React from 'react';
import { ReadyTodos } from '../react-app-env';

type Props = {
  readyTodos: ReadyTodos[];
};
export const TodoList: React.FC<Props> = ({ readyTodos }) => (
  <div className="container">
    {readyTodos.map(todo => (
      <div key={todo.id}>
        {todo.user && (
          <div className="box is-bordered">
            {todo.user.name}
            {todo.user.username}

            <p>
              {`Title: ${todo.title}`}
            </p>
            <p>
              {`Status: ${todo.completed ? 'Completed' : 'Not completed'}`}
            </p>
          </div>
        )}
      </div>
    ))}
  </div>
);
