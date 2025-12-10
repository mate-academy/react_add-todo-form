import './App.scss';
import React from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todos';
import { getUserById } from './services/user';

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todo: Todo[]) {
  const maxId = Math.max(0, ...todo.map(item => item.id));

  return maxId + 1;
}

export const App = () => {
  const [todoList, setTodo] = useState<Todo[]>(todos);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userID, setUserID] = useState(0);
  const [userIdError, setUserIdError] = useState(false);

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserID(+event.target.value);
    setUserIdError(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    if (titleError) {
      setTitleError(false);
    }
  };

  const addTodo = (todo: Todo) => {
    setTodo(currentTodo => [...currentTodo, todo]);
  };

  const formReset = () => {
    setTitle('');
    setUserID(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const hasTitleError = !title.trim();
    const hasUserError = !userID;

    setTitleError(hasTitleError);
    setUserIdError(hasUserError);

    if (hasTitleError || hasUserError) {
      return;
    }

    addTodo({
      userId: userID,
      id: getNewTodoId(todoList),
      title: title,
      completed: false,
      user: getUserById(userID),
    });
    formReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="post-title">
            Title:&nbsp;&nbsp;
          </label>
          <input
            id="post-title"
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="post-subject">
            Subject:&nbsp;&nbsp;
          </label>
          <select
            id="post-subject"
            data-cy="userSelect"
            value={userID}
            onChange={handleUserIdChange}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todoList} />
    </div>
  );
};
