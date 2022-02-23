import React from 'react';
import './TodoList.scss';

import { Todo } from '../../Types/TodoTypes';
import users from '../../api/users';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <div className="todo">
      <ul className="todo__list">
        {todos.map(({ id, title, userId }) => {
          const person = users.find(user => userId === user.id);

          return (
            <li key={id} className="todo__item box">
              <span className="todo__title">
                <span className="tag is-success is-medium">TITLE:</span>
                <p className="tag is-success is-light is-medium">{title}</p>
              </span>
              {person && (
                <div className="todo__user">
                  <span className="todo__user-name">
                    <span className="tag is-success is-medium">NAME:</span>
                    <p className="tag is-success is-light is-medium">
                      {person.name}
                    </p>
                  </span>
                  <span className="todo__user-email">
                    <span className="tag is-success is-medium">EMAIL:</span>
                    <p className="tag is-success is-light is-medium">
                      {person.email}
                    </p>
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
