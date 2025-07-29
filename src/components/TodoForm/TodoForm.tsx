import { useState } from 'react';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | undefined;
};

type Props = {
  users: User[];
  todos: Todo[];
  onSubmit: (value: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ users, todos, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectUser, setSelectUser] = useState(0);
  const [selectUserError, setSelectUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectUser(+event.target.value);
    setSelectUserError(false);
  };

  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!selectUser) {
      setSelectUserError(true);
    }

    if (!title || !selectUser) {
      return;
    }

    setSelectUser(0);
    setTitle('');

    const maxId = Math.max(...todos.map(t => t.id));

    onSubmit({
      id: maxId + 1,
      title,
      completed: false,
      userId: selectUser,
      user: users.find(u => u.id === selectUser),
    });
  };

  return (
    <form action="/api/todos" method="POST" className="TodoForm">
      <div className="field">
        <label htmlFor="">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="select">
          User:
          <select
            name=""
            id="select"
            data-cy="userSelect"
            value={selectUser}
            onChange={handleSelectUserChange}
          >
            <option value={0}>Choose a user</option>
            {users.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </label>
        {selectUserError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton" onClick={handleOnSubmit}>
        Add
      </button>
      {todos.map(t => +t.id)}
    </form>
  );
};
