import React, { useState } from 'react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};
type Todo = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};
type Props = {
  users: User[];
  onAddTodo: (todo: Omit<Todo, 'id'>) => void;
};

export const TodoForm: React.FC<Props> = ({ users, onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [selectUser, setSelectUser] = useState('0');
  const [userError, setUserError] = useState('');
  const handlerSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let hasError = false;

    if (!title.trim()) {
      setTitleError('Please enter a title');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (selectUser === '0') {
      setUserError('Please choose a user');
      hasError = true;
    } else {
      setUserError('');
    }

    if (hasError) {
      return;
    }

    const newTodo = {
      title: title.trim(),
      userId: Number(selectUser),
      completed: false,
    };

    onAddTodo(newTodo);
    setTitle('');
    setSelectUser('0');
  };

  const handlerInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  return (
    <form onSubmit={handlerSubmitForm}>
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handlerInput}
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          name="user"
          data-cy="userSelect"
          value={selectUser}
          onChange={event => {
            setSelectUser(event.target.value);
            setUserError('');
          }}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userError && <span className="error">{userError}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
