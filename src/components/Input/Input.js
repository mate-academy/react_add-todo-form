import React from 'react';
import PropTypes from 'prop-types';
import { StateShape } from '../shapes/StateShape';
import './Input.css';

export const Input = ({ state, dispatch }) => {
  const changeInputText = (event) => {
    const { value } = event.target;

    dispatch({
      type: 'CHANGE_INPUT_TEXT',
      payload: value,
    });
  };

  const handleFocusInput = () => {
    if (state.selectedUserId === 0) {
      dispatch({ type: 'SHOW_WARN' });
    }

    dispatch({ type: 'CLEAR_INPUT_WARN' });
  };

  return (
    <>
      <input
        type="text"
        value={state.inputText}
        className={state.inputWarnMessage
          ? 'AddTodoForm-input Error'
          : 'AddTodoForm-input'
        }
        onChange={changeInputText}
        onFocus={handleFocusInput}
        placeholder="Write new task"
      />
      <div className="inputWarnMessage">{state.inputWarnMessage}</div>
    </>
  );
};

Input.propTypes = {
  state: PropTypes.shape(StateShape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Input;
