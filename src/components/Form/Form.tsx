import React from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';

type Props = {
  onAdd: (post: Todo) => void;
};

export const Form: React.FC<Props> = ({}) => {
  <form action="/api/todos" method="POST">
    <div className="field">
      <input type="text" data-cy="titleInput" />
      <span className="error">Please enter a title</span>
    </div>

    <div className="field">
      <select data-cy="userSelect">
        <option value="0" disabled>
          Choose a user
        </option>
        {usersFromServer.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      <span className="error">Please choose a user</span>
    </div>

    <button type="submit" data-cy="submitButton">
      Add
    </button>
  </form>;
};
