import React, { useState } from 'react';
import { Todo, User } from '../../types/todos';

interface Props {
  addTodo: (newTodo: Todo) => void;
  getUserById: (userId: number) => User | undefined;
  users: User[];
}

const TodoAddForm: React.FC<Props> = ({ addTodo, getUserById, users }) => {
  const [title, setTitle] = useState('');
  const [titleErr, setTitleErr] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedUserErr, setSelectedUserErr] = useState('');

  const clearForm = () => {
    setTitle('');
    setSelectedUser(0);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleErr(`Please enter a title`);
    }

    if (selectedUser === 0) {
      setSelectedUserErr(`Please choose a user`);
    }

    if (!title.trim() || selectedUser === 0) {
      return;
    }

    const newTodo: Todo = {
      id: 0,
      title: title.trim(),
      userId: selectedUser,
      user: getUserById(selectedUser) || undefined,
      completed: false,
    };

    addTodo(newTodo);
    clearForm();
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={submitHandler}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="type title"
          value={title}
          onChange={event => {
            const sanitizedValue = event.target.value.replace(
              /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]/g,
              '',
            );

            setTitle(sanitizedValue);
            setTitleErr('');
          }}
        />
        {titleErr && <span className="error">{titleErr}</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={selectedUser}
          onChange={event => {
            setSelectedUser(+event.target.value);
            setSelectedUserErr('');
          }}
        >
          <option value="0">Choose a user</option>
          {users.map(user => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>

        {selectedUserErr && <span className="error">{selectedUserErr}</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

export default TodoAddForm;
