import React, { useState } from 'react';
import './App.scss';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import todos from './api/todos';
import users from './api/users';
import { spaceValidation, validation } from './helpers/validation';

const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [titleError, setTitleError] = useState('');
  const [userIdError, setUserIdError] = useState('');

  const addNewTodo = () => {
    const todoId = visibleTodos.length + 1;
    const newTodo: Todo = {
      id: todoId,
      userId,
      title,
      completed: false,
    };
    const updatedVisibleTodos = [...visibleTodos, newTodo];

    updatedVisibleTodos.push(newTodo);
    setVisibleTodos((prevTodos => [...prevTodos, newTodo]));
  };

  const titleOnChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validation(event.target.value, title)) {
      setTitle(event.target.value);
    }
  };

  const submitHandler = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const titleAndUserCheck = spaceValidation(title) || !userId;

    if (titleAndUserCheck) {
      if (!title || spaceValidation(title)) {
        setTitleError('enter a title please');
      }

      if (!userId) {
        setUserIdError('choose a user please');
      }

      return;
    }

    setTitleError('');
    setUserIdError('');
    addNewTodo();
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <TodoList todos={visibleTodos} />
      <form
        className="addForm"
        onSubmit={submitHandler}
      >
        <label htmlFor="title" className="error">
          {(spaceValidation(title) || !title) && `${titleError}`}
          <input
            id="title"
            type="text"
            name="title"
            placeholder="title"
            className="addForm__input"
            value={title}
            onChange={titleOnChangeHandler}
          />
        </label>
        <label htmlFor="userId" className="error">
          {!userId && `${userIdError}`}
          <select
            id="userId"
            name="userID"
            value={userId}
            className="addForm__input"
            onChange={(event) => setUserId(+event.target.value)}
          >
            <option
              value={0}
            >
              choose a user
            </option>
            {users.map(user => (
              <option value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <button
          type="submit"
          className="addForm__button"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
