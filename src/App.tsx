import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import { useState } from 'react';
import todosFromServer from './api/todos';
import { User } from './types.ts/User';
import { Todo } from './types.ts/Todo';
export const App = () => {
  const [currentTodos, setCurrentTodos] = useState(todosFromServer);
  const [todoTitle, setTodoText] = useState('');
  const defaultSelected = 'Choose a user';
  const [selectedValue, setSelectedValue] = useState(defaultSelected);
  const [titleHasError, setTitleError] = useState(false);
  const [selecterHasError, setSelecterError] = useState(false);

  function setNewId(): number {
    const higherId = Math.max(...currentTodos.map((todo: Todo) => todo.id));

    return higherId + 1;
  }

  function findUserByName(userName: string): User | null {
    const preperedUser = usersFromServer.find(
      user => user.name.trim().toLowerCase() === userName.trim().toLowerCase(),
    );

    return preperedUser || null;
  }

  function reset() {
    setTodoText('');
    setSelectedValue(defaultSelected);

    setTitleError(false);
    setSelecterError(false);
  }

  function submitHelper(event: React.FormEvent): void {
    event.preventDefault();

    if (todoTitle === '') {
      setTitleError(true);
    }

    if (selectedValue === defaultSelected) {
      setSelecterError(true);
    }

    if (todoTitle === '' || selectedValue === defaultSelected) {
      return;
    } else {
      const todoId = setNewId();
      const foundedUser = findUserByName(selectedValue);

      if (!foundedUser) {
        return;
      }

      const newTodo: Todo = {
        id: todoId,
        title: todoTitle,
        completed: false,
        userId: foundedUser.id,
        user: foundedUser,
      };

      setCurrentTodos([...currentTodos, newTodo]);

      reset();
    }
  }

  const regex = /[^a-zA-Z0-9\u0400-\u04FF\s]/g;

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={event => submitHelper(event)}
        action="/api/todos"
        method="POST"
      >
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            value={todoTitle}
            onChange={event => {
              setTitleError(false);
              setTodoText(event.target.value.replace(regex, ''));
            }}
            id="title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
          />

          {titleHasError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            value={selectedValue}
            onChange={event => {
              setSelectedValue(event.target.value);
              setSelecterError(false);
            }}
            id="user"
            data-cy="userSelect"
          >
            <option value={defaultSelected}>{defaultSelected}</option>
            {usersFromServer.map((user: User) => (
              <option value={user.name} key={user.name}>
                {user.name}
              </option>
            ))}
          </select>

          {selecterHasError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentTodos} users={usersFromServer} />
    </div>
  );
};
