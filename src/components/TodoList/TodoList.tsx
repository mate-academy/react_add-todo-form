import React from 'react';
import { FinalTodo } from '../../react-app-env';

interface Props {
  todosList: FinalTodo[],
}

export const TodosList: React.FC<Props> = ({ todosList }) => {
  return (
    <ul className="list-group">
      {todosList.map(todo => (
        <li key={todo.id} className="list-group-item list-group-item-primary">
          <p className="username">
            {todo.user?.name}
          </p>
          <p className="title">
            {todo.title}
          </p>
          {todo.completed
            ? (
              <p className="complited">
                Complited
              </p>
            )
            : (
              <p className="not-complited">
                Not complited
              </p>
            )}
        </li>
      ))}
    </ul>
  );
};
