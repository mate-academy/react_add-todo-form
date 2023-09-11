import React, { useState } from 'react';

import { FormType, TodoType } from '../../types';
import usersFromServer from '../../api/users';
import { getNewId } from '../../helpers/getNewId';

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
  const [hasInputError, setHasInputError] = useState(false);
  const [hasSelectError, setHasSelectError] = useState(false);

  const handleSetFormValues
  = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, name } = event.target;
    let normalizedValue: number | string = '';

    if (name === 'userSelect') {
      normalizedValue = Number(value);
      setHasSelectError(false);
    }

    if (event.target.name === 'titleInput') {
      normalizedValue = value.trimStart();
      setHasInputError(false);
    }

    setFormValues(prevState => ({
      ...prevState,
      [name]: normalizedValue,
    }));
  };

  const handleAddTodo = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { titleInput: title, userSelect: userId } = formValues;

    if (!title) {
      setHasInputError(true);
    }

    if (userId === 0) {
      setHasSelectError(true);
    }

    if (!title || userId === 0) {
      return;
    }

    const todo: TodoType = {
      id: getNewId(todos) + 1,
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
          onChange={handleSetFormValues}
        />

        {hasInputError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          name="userSelect"
          value={formValues.userSelect}
          required
          onChange={handleSetFormValues}
        >
          <option value="0" disabled>Choose a user</option>

          {usersFromServer.map(({ id, name }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </select>

        {hasSelectError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        onClick={handleAddTodo}
      >
        Add
      </button>
    </form>
  );
};
