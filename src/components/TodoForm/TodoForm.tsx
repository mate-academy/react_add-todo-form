/* eslint-disable */
import React, {useState} from 'react';
import { User } from '../../types/User';
import { Todo } from '../../types/Todo';

type Props = {
  onAdd: (newTodo: Todo) => void;
  users: User[];
  todos: Todo[];
};

export const TodoForm: React.FC<Props> = ({ onAdd, users, todos }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) setTitleError(true);
    if (!userId) setUserIdError(true);

    const user = users.find(user => user.id === userId);

    if (!title || !userId || !user) return;

    const newTodo : Todo = {
      id: maxId,
      title:title,
      completed:false,
      userId:userId,
      user:user!
    };

    onAdd(newTodo);

    setTitle('');
    setUserId(0);
  }


  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdChange}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {userIdError && <span className="error">Please choose a user</span>}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
