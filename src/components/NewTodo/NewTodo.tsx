import React, { useState } from 'react';
import { User } from '../../types/User';
import { TodoUser } from '../../types/TodoUser';

interface Props {
  users: User[];
  todos: TodoUser[];
  onAdd: (newTodo: TodoUser[]) => void;
}

export const NewTodo: React.FC<Props> = ({ users, todos, onAdd }) => {
  const [title, setTitle] = useState('');
  const [select, setSelect] = useState(0);

  const [touched, setTouched] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectError, setHasSelectError] = useState(false);

  const maxId = Math.max(...todos.map(todo => todo.id));

  const reset = () => {
    setTitle('');
    setSelect(0);
    setTouched(false);
    setHasTitleError(false);
    setHasSelectError(false);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (hasTitleError && event.target.value) {
      setHasTitleError(false);
    }
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelect(+event.target.value);

    if (hasSelectError && touched) {
      setHasSelectError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setHasTitleError(true);
    }

    if (select === 0) {
      setHasSelectError(true);
    }

    if (title && select > 0) {
      const user = [...users].filter(client => client.id === select);

      const newPost = {
        id: maxId + 1,
        title: title,
        completed: false,
        userId: select,
        user: user[0],
      };

      onAdd([...todos, newPost]);

      reset();
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title: </label>
        <input
          id="titleInput"
          type="text"
          data-cy="titleInput"
          value={title}
          placeholder="Enter a title"
          onChange={handleChangeTitle}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User: </label>
        <select
          id="userSelect"
          data-cy="userSelect"
          onChange={handleChangeSelect}
          onClick={() => setTouched(true)}
          value={select}
        >
          <option value={'0'} disabled={touched}>
            Choose a user
          </option>
          {users.map(user => {
            return (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>
        {hasSelectError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
