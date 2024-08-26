import React, { useState } from 'react';
import usersFromServer from '../../api/users';
import { Todo } from '../../types/Todo';

type Prop = {
  onAdd: (arg0: Todo) => void;
};

const initialState = {
  id: 0,
  title: '',
  userId: 0,
  completed: false,
  user: null,
};

export const AddTodo: React.FC<Prop> = ({ onAdd }) => {
  const [todo, setTodo] = useState(initialState);

  const [errors, setErrors] = useState({
    title: false,
    userId: false,
  });

  const validateForm = () => {
    const titleValid = todo.title.trim() !== '';
    const userValid = todo.userId !== 0;

    setErrors({
      title: !titleValid,
      userId: !userValid,
    });

    return titleValid && userValid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (validateForm()) {
      onAdd(todo);
      setTodo(initialState);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    const updatedValue = name === 'userId' ? +value : value;

    setTodo(current => ({
      ...current,
      [name]: updatedValue,
      id: 0,
    }));

    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: false,
    }));
  };

  return (
    <>
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todo.title}
            onChange={handleChange}
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            name="userId"
            value={todo.userId}
            onChange={handleChange}
          >
            <option value={0}>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.userId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </>
  );
};
