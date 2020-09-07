import React, { useState } from 'react';
import './Form.css';
import PropTypes, { arrayOf } from 'prop-types';
import ClassNames from 'classnames';

export const Form = ({ users, clickHandler }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [inputError, setInputError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  return (
    <div className="Form">
      <select
        className={ClassNames({
          'user-select': true,
          error: selectError,
        })}
        defaultValue="default"
        onChange={(e) => {
          setSelectValue(Number(e.target.value));
          setSelectError(false);
          e.target.classList.remove('error');
        }}
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
        className={ClassNames({
          'todo-input': true,
          error: inputError,
        })}
        placeholder="Enter your todo"
        onChange={(e) => {
          setInputValue(e.target.value);
          setInputError(false);
          e.target.classList.remove('error');
        }}
      />

      <p className="error-area">
        {inputError && 'Title is empty'}
        {selectError && 'User is not chosen'}
      </p>

      <button
        type="button"
        className="add-button"
        onClick={() => {
          if (!selectValue) {
            setSelectError(true);

            return;
          }

          if (!inputValue) {
            setInputError(true);

            return;
          }

          const {
            name,
            username,
            email,
            address,
            id,
          } = users.find(current => current.id === selectValue);

          clickHandler({
            name,
            username,
            email,
            address,
            userId: id,
            title: inputValue,
            completed: false,
          });
        }}
      >
        Add
      </button>
    </div>
  );
};

Form.propTypes = {
  users: arrayOf(
    PropTypes.shape(),
  ).isRequired,
  clickHandler: PropTypes.func.isRequired,
};
