import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';

const initializedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer
    .find((user: User) => user.id === todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initializedTodos);
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [userError, setUserError] = useState<string>('');
  const [titleError, setTitleError] = useState<string>('');

  const findUserById = (id: number): User | undefined => {
    return usersFromServer.find((user: User) => user.id === id);
  };

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

    let hasError = false;

    if (!selectedUser || selectedUser === 0) {
      setUserError('Please choose a user');
      hasError = true;
    } else {
      setUserError('');
    }

    if (newTodoTitle === '') {
      setTitleError('Please enter a title');
      hasError = true;
    } else {
      setTitleError('');
    }

    if (hasError) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id), 0) + 1;

    const newTodo: Todo = {
      id: newId,
      title: newTodoTitle,
      userId: selectedUser,
      completed: false,
      user: findUserById(selectedUser),
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
