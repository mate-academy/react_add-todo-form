import React, { useState } from 'react';
import './AddTodoForm.scss';
import { User } from '../../intefaces/User';
import { Todo } from '../../intefaces/Todo';

interface AddTodoFormProps {
  todos: Todo[];
  users: User[];
  onAddTodo: (todo: Todo) => void;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({
  todos,
  users,
  onAddTodo,
}) => {
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [titleError, setTitleError] = useState<string>('');
  const [userError, setUserError] = useState<string>('');

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredValue = event.target.value.replace(
      /[^A-Za-z0-9\u0400-\u04FF\s]/g,
      '',
    );

    setTitle(filteredValue);

    if (filteredValue.trim().length === 0) {
      setTitleError('Please enter a title');
    } else {
      setTitleError('');
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError('Please enter a title');
    } else {
      setTitleError('');
    }

    if (userId === 0) {
      setUserError('Please choose a user');
    } else {
      setUserError('');
    }

    if (title.trim() && userId !== 0) {
      const newTodo: Todo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        userId,
        completed: false,
      };

      onAddTodo(newTodo);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="#title">Title: </label>
        <input
          name="title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {titleError && <span className="error">{titleError}</span>}
      </div>

      <div className="field">
        <label htmlFor="#user">User: </label>
        <select
          name="user"
          data-cy="userSelect"
          value={userId}
          onChange={event => {
            setUserId(Number(event.target.value));
            setUserError('');
          }}
        >
          <option value={0} disabled>
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
