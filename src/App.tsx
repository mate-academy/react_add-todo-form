import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import { useState } from 'react';
import todosFromServer from './api/todos';
import { ToDoUser } from './types/ToDoUser';
import { ToDo } from './types/ToDo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getIdNewToDo = (arr: ToDoUser[]) => {
  const maxId = Math.max(...arr.map(todo => todo.id));

  return maxId + 1;
};

const addToDo = (data: ToDo) => {
  const newToDo = {
    ...data,
    id: getIdNewToDo(todos),
    user: getUserById(data.userId),
  };

  todos.push(newToDo);
};

export const App = () => {
  const [newPost, setNewPost] = useState({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  const [errors, setErrors] = useState({
    titleError: false,
    userIdError: false,
  });

  const validationForm = () => {
    if (!newPost.title) {
      setErrors(prevErrors => ({
        ...prevErrors,
        titleError: true,
      }));
    }

    if (newPost.userId < 1) {
      setErrors(prevErrors => ({
        ...prevErrors,
        userIdError: true,
      }));
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validationForm();

    if (!newPost.title || newPost.userId === 0) {
      return;
    }

    addToDo(newPost);

    setNewPost({
      id: 0,
      title: '',
      completed: false,
      userId: 0,
    });
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPost(prevPost => ({
      ...prevPost,
      title: event.target.value.trimStart(),
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      titleError: false,
    }));
  };

  const handleChangeUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNewPost(prevPost => ({
      ...prevPost,
      userId: +event.target.value,
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      userIdError: false,
    }));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              data-cy="titleInput"
              type="text"
              id="title"
              placeholder="Enter a title"
              value={newPost.title}
              onChange={event => handleChangeTitle(event)}
            />
          </label>
          {errors.titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={newPost.userId}
              name="userId"
              onChange={event => handleChangeUserId(event)}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {errors.userIdError && (
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
