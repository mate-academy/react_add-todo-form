import React from 'react';
import './AddTodoForm.css';
import PropTypes from 'prop-types';

export const AddTodoForm = (props) => {
  const {
    addTodo,
    inputText,
    changeInputText,
    handleFocusInput,
    selectedUserId,
    inputMessage,
  } = props;

  return (
    <form onSubmit={addTodo} className="AddTodoForm">
      <input
        type="text"
        value={inputText}
        className={inputMessage
          ? 'AddTodoForm-input Error'
          : 'AddTodoForm-input'
        }
        onChange={e => changeInputText(e.target.value)}
        onFocus={handleFocusInput}
        placeholder="Write new task"
      />

      <button
        type="submit"
        disabled={!selectedUserId}
        className="AddTodoForm-btn"
      >
        +
      </button>
    </form>
  );
};

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  inputText: PropTypes.string.isRequired,
  changeInputText: PropTypes.func.isRequired,
  handleFocusInput: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  inputMessage: PropTypes.string.isRequired,
};
