import React from 'react';
import './Form.css';
import PropTypes, { arrayOf } from 'prop-types';

export const Form = ({ users, clickHandler }) => (
  <div className="Form">
    <select
      className="user-select"
      defaultValue="default"
    >
      <option value="default" disabled>Select a user</option>
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
      className="todo-input"
      placeholder="Enter your todo"
    />
    <p className="error-area" />
    <button
      type="button"
      className="add-button"
      onClick={() => {
        const input = document.querySelector('.todo-input');
        const userSelect = document.querySelector('.user-select');
        const errorArea = document.querySelector('.error-area');

        if (!+userSelect.value) {
          errorArea.textContent = 'User is not chosen';
          userSelect.style.outline = '1px solid red';

          return;
        }

        errorArea.textContent = '';
        userSelect.style.outline = '';

        if (!input.value) {
          errorArea.textContent = 'Title is empty';
          input.style.outline = '1px solid red';

          return;
        }

        errorArea.textContent = '';
        input.style.outline = '';

        const {
          name,
          username,
          email,
          address,
          id,
        } = users.find(current => current.id === +userSelect.value);

        clickHandler({
          name,
          username,
          email,
          address,
          userId: id,
          title: input.value,
          completed: false,
        });
      }}
    >
      Add
    </button>
  </div>
);

Form.propTypes = {
  users: arrayOf(
    PropTypes.shape(),
  ).isRequired,
  clickHandler: PropTypes.func.isRequired,
};
