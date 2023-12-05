import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';

const getUserById = (id: number): User | undefined => {
  return usersFromServer.find(user => user.id === id);
};

const initializedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initializedTodos);
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [userError, setUserError] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');

  const clear = () => {
    setNewTodoTitle('');
    setSelectedUser(0);
  };

  const handleSelect = (element: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+element.target.value);
    setUserError('');
  };

  const handleTitle = (element: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(element.target.value);
    setTitleError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const userErrorMessage = !selectedUser || selectedUser === 0
      ? 'Please choose a user'
      : '';
    const titleErrorMessage = !newTodoTitle
      ? 'Please enter a title'
      : '';

    setUserError(userErrorMessage);
    setTitleError(titleErrorMessage);

    if (userErrorMessage || titleErrorMessage) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id), 0) + 1;

    const newTodo: Todo = {
      id: newId,
      title: newTodoTitle,
      userId: selectedUser,
      completed: false,
      user: getUserById(selectedUser),
    };

    setTodos([...todos, newTodo]);
    clear();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            value={newTodoTitle}
            placeholder="Enter a title"
            onChange={handleTitle}
          />
          <span className="error">{titleError}</span>
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={selectedUser || ''}
            onChange={handleSelect}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map((user: User) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <span className="error">{userError}</span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
