import React from 'react';
import { TodoList } from '../react-app-env';

interface Props {
  todosList: TodoList[],
}

export const TodosList: React.FC<Props> = ({ todosList }) => {
  return (
    <ul className="list">
      {todosList.map(todo => (
        <li key={todo.id} className="list__item">
          <p className="list__userName">
            {todo.user?.name}
          </p>
          <p className="list__title">
            {todo.title}
          </p>
          {todo.completed
            ? (
              <p className="list__status--complited">
                Complited
              </p>
            )
            : (
              <p className="list__status--not-complited">
                Not complited
              </p>
            )}
        </li>
      ))}
    </ul>
  );
};
