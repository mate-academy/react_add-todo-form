import React, { useState } from 'react';
import { Todo } from './components/types/Todo';

import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const App: React.FC = () => {
  const [todoDescription, setTodoDescription] = useState('');
  const [hasTodoDescriptionError, setTodoDescriptionError] = useState('');

  const [todoExecutor, setTodoExecutor] = useState('');
  const [hasTodoExecutorError, setTodoExecutorError] = useState('');

  const [todosList, setTodosList] = useState<Todo[]>(todosFromServer);

  const clearForm = () => {
    setTodoDescription('');
    setTodoExecutor('');
  };

  const usersOptionsList = usersFromServer.map(user => (
    <option
      key={user.id}
      value={user.name}
    >
      {user.username}
    </option>
  ));

  const handleFormSubmit = () => {
    if (!todoExecutor || todoDescription.trim().length < 5) {
      if (!todoExecutor) {
        setTodoExecutorError('Please choose a user');
      }

      if (todoDescription.trim().length < 5) {
        setTodoDescriptionError('Please enter a description');
      }

      return;
    }

    setTodosList(prevTodos => ([
      ...prevTodos,
      {
        userId: usersFromServer.filter(user => user.name === todoExecutor)[0].id,
        id: prevTodos.length + 1,
        title: todoDescription,
        completed: false,
      },
    ]));

    clearForm();
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodoDescription(event.target.value);

    if (event.target.value.length > 5) {
      setTodoDescriptionError('');
    }
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setTodoExecutor(event.target.value);

    if (event.target.value) {
      setTodoExecutorError('');
    }
  };

  const getUserName = (todoUserId: number) => (
    usersFromServer.find(user => user.id === todoUserId)?.username
  );

  return (
    <div className="App">
      <h1>
        {'Todo:  '}
        {todoDescription}
        <br />
        {' Executor: '}
        {todoExecutor}
      </h1>

      <form
        method="POST"
        action="#"
        className="Todo__form"
        onSubmit={(event) => {
          event.preventDefault();
          handleFormSubmit();
        }}
      >
        <input
          type="text"
          placeholder="Enter the new todo"
          className="todo__textarea"
          value={todoDescription}
          onChange={handleDescriptionChange}
        />

        {hasTodoDescriptionError && (
          <span className="todo__error">Please enter a description</span>
        )}

        <select
          className="user__select"
          value={todoExecutor}
          onChange={handleSelectChange}
        >
          <option value="" disabled>Choose a user</option>
          {usersOptionsList}
        </select>

        {hasTodoExecutorError && (
          <span className="select__error">Please choose a user</span>
        )}

        <button
          type="submit"
          className="add__todo-button"
        >
          ++Add
        </button>
      </form>

      <ul className="todo__list">
        {todosList.map(todo => (
          <li className="todo__item" key={todo.id}>
            <p className="todo__info">
              <h2 className="todo__description">
                {todo.title}
              </h2>

              executor:
              {' '}
              {getUserName(todo.userId)}
              {' | '}
              {!todo.completed && `completed: ${todo.completed}`}
            </p>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
