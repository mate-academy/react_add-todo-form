import { User } from '../TodoList';
import { Todo } from '../TodoList';
import React, { useState } from 'react';

interface Props {
  users: User[];
  todos: Todo[];
  addFunc: (newTodo: Todo) => void;
}

export const Form: React.FC<Props> = ({ users, todos, addFunc }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Validate inputs
    const isTitleValid = !!title.trim();
    const isUserValid = userId > 0;

    setTitleError(!isTitleValid);
    setUserError(!isUserValid);

    if (isTitleValid && isUserValid) {
      // Generate new ID safely (handle empty todos array)
      const newId =
        todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

      addFunc({
        id: newId,
        title: title.trim(),
        completed: false,
        userId,
      });

      // Reset form
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">
          Title:
          <input
            name="title"
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            onChange={event => setTitle(event.target.value)}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </label>
      </div>

      <div className="field">
        <label>
          User:
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => setUserId(Number(event.target.value))}
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
        </label>
        {userError && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
