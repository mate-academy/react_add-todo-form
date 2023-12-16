import React, { useState } from 'react';

import './TodoForm.scss';

import { User, Todo } from '../../react-app-env';

interface Props {
  users: User[],
  onAdd: (todo: Todo) => void,
  maxId: number,
}

const initialTodo: Todo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
};

export const TodoForm: React.FC<Props> = ({
  users,
  onAdd,
  maxId,
}) => {
  const [inputError, setInputError] = useState(false);
  const [optionError, setOptionError] = useState(false);
  const [todo, setTodo] = useState(initialTodo);

  const handleError = (currentTodo: Todo) => {
    const isTitleValid = currentTodo.title.trim() !== '';
    const isUserIdValid = currentTodo.userId !== 0;

    setInputError(!isTitleValid);
    setOptionError(!isUserIdValid);
  };

  const handleReset = () => {
    setTodo(initialTodo);
    setInputError(false);
    setOptionError(false);
  };

  const handleInputChange = (value: string) => {
    const newTodo = { ...todo, title: value };

    setTodo(newTodo);
    setInputError(false);
  };

  const handleSelectChange = (value: number) => {
    const newTodo = { ...todo, userId: value };

    setTodo(newTodo);
    setOptionError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todo.title.trim() || !todo.userId) {
      handleError(todo);

      return;
    }

    onAdd({ ...todo, id: maxId + 1 });

    handleReset();
  };

  return (
    <form
      key={maxId}
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          className="input"
          placeholder="Type a title of todo"
          value={todo.title}
          onChange={e => handleInputChange(e.target.value)}
        />
        {inputError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={todo.userId}
          onChange={e => handleSelectChange(+e.target.value)}
        >
          <option value="0" disabled>Choose a user</option>

          {users.map((user) => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {optionError && <span className="error">Please choose a user</span>}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
