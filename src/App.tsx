import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './components/types/User';
import { Todo } from './components/types/Todo';
import { TodoList } from './components/TodoList';

export const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find((user: User) => user.id === todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [isInvalidField, setIsInvalidField] = useState({
    userId: false,
    title: false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsInvalidField(currentIsInvalid => ({
      ...currentIsInvalid,
      userId: selectedUserId === '',
      title: newTitle.trim() === '',
    }));

    if (selectedUserId && newTitle.trim()) {
      const newTodo: Todo = {
        id: Math.max(...todosWithUsers.map(todo => todo.id)) + 1,
        userId: Number(selectedUserId),
        title: newTitle,
        completed: false,
        user: usersFromServer
          .find((user: User) => user.id === Number(selectedUserId)),
      };

      setTodos(currentTodos => [...currentTodos, newTodo]);
      setNewTitle('');
      setSelectedUserId('');
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { value, type } = event.target;
    const TEXT_INPUT = 'text';

    if (type === TEXT_INPUT) {
      setNewTitle(value);
      setIsInvalidField(currentIsInvalid => ({
        ...currentIsInvalid,
        title: false,
      }));
    } else {
      setSelectedUserId(value);
      setIsInvalidField(currentIsInvalid => ({
        ...currentIsInvalid,
        userId: false,
      }));
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTitle}
              onChange={handleChange}
            />
          </label>

          {isInvalidField.title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              name="user id"
              data-cy="userSelect"
              value={selectedUserId}
              onChange={handleChange}
            >
              <option value="" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isInvalidField.userId && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
