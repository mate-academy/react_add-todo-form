import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './components/TSTypes/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function findByIdHelper(userId: number) {
  return usersFromServer.find(({ id }) => id === userId);
}

const todosWithUsers = todosFromServer.map(todo => {
  const user = findByIdHelper(todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [toDoList, setToDoList] = useState<Todo[]>(todosWithUsers);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const resetFields = () => {
    setTitle('');
    setIsTitleError(false);

    setUserId(0);
    setIsUserError(false);
  };

  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = findByIdHelper(userId);

    setIsTitleError(!title);
    setIsUserError(!userId);

    if (!userId || !title) {
      return;
    }

    const maxId = Math.max(...toDoList.map(todo => todo.id));
    const newId = maxId + 1;

    setToDoList(todoList => [
      ...todoList,
      {
        id: newId,
        title,
        userId,
        completed: false,
        user,
      },
    ]);

    resetFields();
  };

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setIsTitleError(false);
  }

  function handleUserIdSelect(event: React.ChangeEvent<HTMLSelectElement>) {
    setUserId(+event.target.value);
    setIsUserError(false);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={submitForm}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {
            isTitleError
            && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdSelect}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }) => (
              <option
                value={id}
                key={id}
              >
                {name}
              </option>
            ))}
          </select>

          {
            isUserError
            && <span className="error">Please choose a user</span>
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={toDoList} />
    </div>
  );
};
