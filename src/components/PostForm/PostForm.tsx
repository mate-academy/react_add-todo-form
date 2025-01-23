import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import { getUserById } from '../../services/user';

type Props = {
  onSubmit: (newTodo: Todo) => void;
};
export const PostForm: React.FC<Props> = ({ onSubmit }) => {

  const [newTitle, setNewTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value); 
  };

  const [newUser, setNewUser] = useState('');
  const [hasUserError, setHasUserError] = useState(false);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setNewUser(event.target.value); 
  };
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!newTitle);
    setHasUserError(!newUser);
    
    if (!newTitle || !newUser) {
      return;
    }

    const newTodo = {
      title: newTitle,
      completed: false,
      user: getUserById(parseInt(newUser))
    };
    
    onSubmit(newTodo);

    setHasTitleError(false);
    setHasUserError(false);
    
    setNewTitle('');
    setNewUser('');
  };
  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor="inputInfo">
          Title:
        </label>
        <input
          type="text"
          data-cy="titleInput"
          id="inputInfo"
          placeholder="Enter a title"
          value={newTitle}
          onChange={handleTitleChange}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor="user-id">
          User:
        </label>
        <select
          data-cy="userSelect"
          id="user-id"
          value={newUser}
          onChange={handleUserChange}
        >
          <option value="0">
            Choose a user
          </option>

          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
