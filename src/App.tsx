import React, { useState } from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { FormSelect } from './components/FormSelect/FormSelect';

const initialFormState = {
  todoTitle: '',
  todoUserId: 0,
};

const App: React.FC = () => {
  const [validTodos, setValidTodos] = useState(todos);
  const [todoTitle, setTodoTitle] = useState(initialFormState.todoTitle);
  const [todoUserId, setTodoUserId] = useState(initialFormState.todoUserId);
  const [titleError, setTitleError] = useState(false);
  const [todoUserIdError, setTodoUserIdError] = useState(false);

  const resetForm = () => {
    setTodoTitle(initialFormState.todoTitle);
    setTodoUserId(initialFormState.todoUserId);
    setTitleError(false);
    setTodoUserIdError(false);
  };

  const handleForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle.trim()) {
      setTitleError(true);
    }

    if (todoUserId === 0) {
      setTodoUserIdError(true);
    }

    if (todoTitle.trim() && todoUserId) {
      setValidTodos(current => [
        ...current, {
          title: todoTitle,
          userId: todoUserId,
          id: current.length + 1,
          completed: false,
        },
      ]);

      resetForm();
    }
  };

  const addTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setTitleError(false);
  };

  const addTodoUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoUserId(Number(event.target.value));
    setTodoUserIdError(false);
  };

  return (
    <div className="App">
      <h1 className="page-title">Static list of todos</h1>
      <form
        className="form"
        onSubmit={handleForm}
      >
        <div className="form__input-section">
          <input
            type="text"
            value={todoTitle}
            onChange={addTodoTitle}
          />

          {titleError && (
            <span className="error">
              Please Enter title
            </span>
          )}
        </div>

        <div className="form__input-section">
          <FormSelect
            users={users}
            addTodoUserId={addTodoUserId}
            todoUserId={todoUserId}
          />

          {todoUserIdError && (
            <span className="error">
              Please choose user
            </span>
          )}

        </div>
        <button type="submit">
          Add
        </button>
      </form>
      <TodoList todos={validTodos} />
    </div>
  );
};

export default App;
