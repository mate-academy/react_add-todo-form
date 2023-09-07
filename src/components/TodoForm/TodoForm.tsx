import React, { useState } from 'react';

import { FormType, TodoType } from '../../types';
import usersFromServer from '../../api/users';
import { findMaxId } from '../../helpers/findMaxTodoId';

type Props = {
  addTodo: (todo: TodoType) => void,
  todos: TodoType[]
};

const initialFormValue = {
  titleInput: '',
  userSelect: 0,
};

export const TodoForm: React.FC<Props> = ({ addTodo, todos }) => {
  const [formValues, setFormValues] = useState<FormType>(initialFormValue);
  const [inputError, setInputError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const handleSetFormValues
  = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value: number | string = '';

    if (event.target.name === 'userSelect') {
      value = Number(event.target.value);
      setSelectError(false);
    }

    if (event.target.name === 'titleInput') {
      value = event.target.value.trimStart();
      setInputError(false);
    }

    setFormValues(prevState => ({
      ...prevState,
      [event.target.name]: value,
    }));
  };

  const handleAddTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { titleInput: title, userSelect: userId } = formValues;

    if (!title) {
      setInputError(true);
    }

    if (userId === 0) {
      setSelectError(true);
    }

    if (!title || userId === 0) {
      return;
    }

    const todo: TodoType = {
      id: findMaxId(todos) + 1,
      completed: false,
      title,
      userId,
    };

    addTodo(todo);
    setFormValues(initialFormValue);
  };

  return (
    <form action="/api/todos" method="POST">
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          name="titleInput"
          value={formValues.titleInput}
          required
          onChange={(e) => handleSetFormValues(e)}
        />

        {inputError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          name="userSelect"
          value={formValues.userSelect}
          required
          onChange={(e) => handleSetFormValues(e)}
        >
          <option value="0" disabled>Choose a user</option>

          {usersFromServer.map(({ id, name }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </select>

        {selectError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        onClick={e => handleAddTodo(e)}
      >
        Add
      </button>
    </form>
  );
};
