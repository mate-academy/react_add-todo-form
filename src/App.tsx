import './App.scss';
import React, { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [isUserError, setSelectedUserError] = useState(false);
  const [isTitleError, setTitleError] = useState(false);
  const [todoList, setTodoList] = useState(todos);
  const [title, setTitleNew] = useState('');
  const [userId, setUserId] = useState(0);

  const handlerNewTodo = () => {
    const newTodo = {
      id: Math.max(...(todoList.map(todo => todo.id))) + 1,
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    return setTodoList(prevTodo => (
      [...prevTodo, newTodo]
    ));
  };

  const clearForm = () => {
    setTitleNew('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId) {
      setSelectedUserError(true);
    }

    if (!title.trim()) {
      setTitleError(true);
    }

    if (title.trim() && userId) {
      handlerNewTodo();
      clearForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            className="input"
            value={title}
            onChange={event => {
              setTitleNew(event.target.value);
              if (isTitleError) {
                setTitleError(false);
              }
            }}
          />
          {(isTitleError)
            && (
              <span className="error">
                Please enter a title
              </span>
            )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            className="select"
            value={userId}
            onChange={(event) => {
              setUserId(Number(event.target.value));
              if (isUserError) {
                setSelectedUserError(false);
              }
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(userSelect => (
              <option
                value={userSelect.id}
                key={userSelect.id}
              >
                {userSelect.name}
              </option>
            ))}
          </select>

          {(isUserError)
            && (
              <span className="error">
                Please choose a user
              </span>
            )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <section className="TodoList">
        <TodoList todos={todoList} />
      </section>
    </div>
  );
};
