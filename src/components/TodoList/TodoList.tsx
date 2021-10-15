import React from 'react';
import users from '../../api/users';

type Props = {
  todos: Todo[];
};

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <ul className="list-group-item">
      {todos.map(todo => {
        const newUser = users.find(user => user.id === todo.userId);

        return (
          <li
            key={todo.id}
            className="list-group-item list-group-item-secondary"
          >
            <div>
              Name:
              {' '}
              {newUser?.name}
              <br />
              {todo.title}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
