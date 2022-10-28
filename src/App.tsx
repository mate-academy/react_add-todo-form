import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { TodosWithUsers } from './react-app-env';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const todosWithUsers: TodosWithUsers[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<TodosWithUsers[]>(todosWithUsers);
  const [newTitle, setNewTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [emptyTitleError, setEmptyTitleError] = useState(false);
  const [emptyUserError, setemptyUserError] = useState(false);

  const getBigestId = () => {
    return Math.max(...(todos.map(todo => todo.id))) + 1;
  };

  const resetForm = () => {
    setNewTitle('');
    setSelectedUser(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setEmptyTitleError(!emptyTitleError);
    setemptyUserError(!emptyUserError);

    const newTodo: TodosWithUsers = {
      id: getBigestId(),
      title: newTitle,
      completed: false,
      userId: selectedUser,
      user: usersFromServer.find(user => user.id === selectedUser) || null,
    };

    if (newTitle && selectedUser) {
      setTodos(curTodos => [...curTodos, newTodo]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={newTitle}
            onChange={event => {
              setNewTitle(event.target.value);
            }}
          />
          {!newTitle && emptyTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(+event.target.value);
            }}

          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {!selectedUser && emptyUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
