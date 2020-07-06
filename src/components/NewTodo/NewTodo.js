import React from 'react';
import { Select } from '../Select/Select';
import { NewTodoShape } from '../Shapes/NewTodoShape';

export const NewTodo = (props) => {
  const {
    name,
    handleChange,
    userId,
    usersOptions,
    handleSubmit,
  } = props;

  return (
    <form name="addTodo" className="addTodo" onSubmit={handleSubmit}>
      <label>
        Todo
        <input
          name="name"
          type="text"
          className="addTodo__input"
          value={name}
          onChange={
            ({ target }) => handleChange(target.value, target.name)
          }
        />
      </label>

      <label htmlFor="select">
        User
        <Select
          name="userId"
          className="addTodo__input"
          value={userId}
          onChange={handleChange}
          options={usersOptions}
        />
      </label>

      <button type="submit">
        Add Todo
      </button>
    </form>
  );
};

NewTodo.propTypes = NewTodoShape.isRequired;
