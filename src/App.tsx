import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types/TodoWithUser';

import { TodoList } from './components/TodoList';

const findUserById = (id: number) => {
  return usersFromServer.find(user => user.id === id) || null;
};

const todosWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

const getNewId = (todos: TodoWithUser[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [todos, setTodos] = useState(todosWithUser);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const addNewTodo = (title: string, userId: number) => {
    const newTodo: TodoWithUser = {
      id: getNewId(todos),
      title,
      completed: false,
      userId,
      user: findUserById(userId),
    };

    setTodos((previousTodos) => [...previousTodos, newTodo]);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!newTodoTitle.trim()) {
      setHasTitleError(true);
    }

    if (!selectedUserId) {
      setHasUserError(true);
    }

    if (newTodoTitle && selectedUserId) {
      addNewTodo(newTodoTitle, selectedUserId);
      setNewTodoTitle('');
      setSelectedUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              value={newTodoTitle}
              onChange={event => {
                setNewTodoTitle(event.target.value);
                setHasTitleError(false);
              }}
              placeholder="Enter a title"
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={event => {
                setSelectedUserId(+event.target.value);
                setHasUserError(false);
              }}
            >
              <option value="0" selected disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
