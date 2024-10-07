import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './Types/user';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';
import { Todo } from './Types/todo';
import { FormFields } from './Types/formFields';
import { makeNewTodo } from './Utils/makeNewTodo';

const formFields: FormFields = {
  title: '',
  user: '0',
};

const preparedTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId),
  };
});

const formFieldsErrors = () => {
  const fieldsErrors: { [key: string]: boolean } = {};

  for (const key in formFields) {
    fieldsErrors[key] = false;
  }

  return fieldsErrors;
};

export const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>([...preparedTodos]);
  const [errorsInForm, setErrorsInForm] = useState(formFieldsErrors());
  const [newTodoForm, setNewTodoForm] = useState({ ...formFields });
  const [isTouched, setIsTouched] = useState(false);

  const handleValidation = (newTodo: FormFields) => {
    for (const key in newTodo) {
      const isError = newTodo[key] === formFields[key];

      if (isError) {
        setErrorsInForm(prevState => {
          return {
            ...prevState,
            [key]: true,
          };
        });
      }
    }
  };

  const handleErrorAppear = (isIncorrectField: boolean) => {
    return isIncorrectField && isTouched;
  };

  const handleClearForm = () => {
    setNewTodoForm({ ...formFields });
  };

  const handleFormChange = (fieldName: string, value: string) => {
    setErrorsInForm(prevState => {
      return {
        ...prevState,
        [fieldName]: false,
      };
    });
    setNewTodoForm(prevState => {
      return {
        ...prevState,
        [fieldName]: value,
      };
    });
  };

  const mistakesInForm =
    newTodoForm.title === formFields.title ||
    newTodoForm.user === formFields.user;

  const handleAddTodo = (
    event: React.FormEvent<HTMLFormElement>,
    todo: FormFields,
  ): void => {
    event.preventDefault();
    setIsTouched(true);
    handleValidation(newTodoForm);

    if (mistakesInForm) {
      return;
    }

    const newTodo = makeNewTodo(
      Math.max(...todoList.map(task => task.id)) + 1,
      todo.title,
      +todo.user,
      usersFromServer,
    );

    setTodoList(prevState => {
      return [...prevState, newTodo];
    });

    handleClearForm();
    setIsTouched(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={submitEvent => handleAddTodo(submitEvent, newTodoForm)}>
        <div className="field">
          <label>
            <span>Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTodoForm.title}
              onChange={changeEvent =>
                handleFormChange('title', changeEvent.target.value.trimStart())
              }
            />
          </label>
          {handleErrorAppear(errorsInForm.title) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              value={newTodoForm.user}
              data-cy="userSelect"
              onChange={changeEvent =>
                handleFormChange('user', changeEvent.target.value)
              }
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map((user: User) => {
                return (
                  <option value={user.id.toString()} key={user.id}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </label>

          {handleErrorAppear(errorsInForm.user) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todoList} />;
    </div>
  );
};
