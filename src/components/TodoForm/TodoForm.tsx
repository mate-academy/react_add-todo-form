import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

interface Props {
  onAdd: (newTodo: Todo) => void;
  todos: Todo[];
  users: User[];
}

export const TodoForm: React.FC<Props> = ({ onAdd, todos, users }) => {
  const initialTodo = {
    id: Math.max(...todos.map(todo => todo.id)) + 1,
    title: '',
    userId: 0,
    completed: false,
    user: null,
  };

  const [todo, setTodo] = useState<Todo>(initialTodo);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const { title, userId } = todo;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setTodo(prev => ({
      ...prev,
      title: value,
    }));
    if (value.trim() !== '') {
      setTitleError(false);
    }
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(event.target.value);
    const selectedUser = users.find(u => u.id === value);

    setTodo(prev => ({
      ...prev,
      userId: value,
      user: selectedUser || null,
    }));
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (userId === 0) {
      setUserError(true);
    }

    if (!title.trim() || userId === 0) {
      return;
    }

    onAdd(todo);
    setTodo(initialTodo);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title: </label>
        <input
          name="title"
          type="text"
          id="title"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={handleTitleChange}
        />
        {!title.trim() && titleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label htmlFor="user">User: </label>
        <select
          name="userId"
          id="user"
          data-cy="userSelect"
          onChange={handleSelectUser}
          value={userId}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        {userId === 0 && userError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
