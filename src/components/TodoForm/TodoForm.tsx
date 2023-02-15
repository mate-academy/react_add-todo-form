import React, { useContext, useState } from 'react';
import usersFromServer from '../../api/users';
import { getUserById } from '../../utils/getUserById';
import { TodosContext } from '../TodosProvider';

export const TodoForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasSelectedUserIdError, setHasSelectedUserIdError] = useState(false);

  const { addTodo, todos } = useContext(TodosContext);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectedUserIdError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    const newTodo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      completed: false,
      userId: selectedUserId,
      user: getUserById(selectedUserId),
    };

    addTodo(newTodo);

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <form action="/api/users" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={(event) => {
            setHasTitleError(false);
            setTitle(event.target.value);
          }}
        />
        {hasTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={selectedUserId}
          onChange={(event) => {
            setHasSelectedUserIdError(false);
            setSelectedUserId(+event.target.value);
          }}
        >
          <option value="0" disabled>Choose a user</option>

          {usersFromServer.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasSelectedUserIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
