import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser, User } from './react-app-env';

const getUser = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const todoWithUser: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [todos, setTodos] = useState<TodoWithUser[]>(todoWithUser);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');

  const addTodo = () => {
    const maxId = Math.max(...todos.map(todo => todo.id));

    if (title.trim().length) {
      const newTodo = {
        id: maxId + 1,
        title: title.trim(),
        completed: false,
        userId: selectedUserId,
        user: usersFromServer.find(user => user.id === selectedUserId) || null,
      };

      setTodos(currentTodos => [...currentTodos, newTodo]);
    }
  };

  const clearTitle = () => {
    setTitle('');
  };

  const clearSelectedUserId = () => {
    setSelectedUserId(0);
  };

  const isValidTitle = (text: string) => {
    const pattern = /^[A-Za-z0 9\s]*$|[бвгґджзклмнпрстфхцчшщйаеєиіїоуюяь]/i;

    return pattern.test(text);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.currentTarget.value);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsSubmit(true);

    if (title && selectedUserId && isValidTitle(title)) {
      addTodo();
      clearTitle();
      clearSelectedUserId();
      setIsSubmit(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <label htmlFor="createTitle">
            Tilte:&nbsp;
          </label>

          <input
            id="createTitle"
            type="text"
            value={title}
            placeholder="Enter a title"
            data-cy="titleInput"
            onChange={handleInputChange}
          />

          {isSubmit && !title && (
            <span className="error">&nbsp;Please enter a title &#128521;</span>
          )}

          {isSubmit && !isValidTitle(title) && (
            <span className="error">
              &nbsp;The title can contain only letters,
              numbers and no more than 1 space in a row &#128546;
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="selectUser">
            User:&nbsp;
          </label>

          <select
            style={
              { marginTop: '10px' }
            }
            id="selectUser"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {isSubmit && !selectedUserId && (
            <span className="error">&nbsp;Please choose a user &#128521;</span>
          )}
        </div>

        <button
          style={
            { marginTop: '10px' }
          }
          type="submit"
          data-cy="submitButton"
          onClick={onSubmit}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
