import React from 'react';
import { formShape } from '../shape';

const Form = (props) => {
  const { selectUser, users, todosTitle, saveTodos } = props;

  return (
    <form
      onSubmit={saveTodos}
      className="todo-form"
    >
      <h1>Add Todo:</h1>

      <select
        className="todo-form__users"
        onChange={selectUser}
        required
        defaultValue=""
      >
        <option value="" disabled="disabled">Select a user</option>

        {users.map(user => (
          <option
            key={user.id}
            value={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>

      <input
        placeholder="Write the task"
        required
        maxLength={40}
        type="text"
        onChange={event => todosTitle(event.target.value)}
        className="todo-form__title"
      />

      <button
        type="submit"
        className="todo-form__submit"
      >
        Save
      </button>
    </form>
  );
};

export default Form;

Form.propTypes = formShape.isRequired;
