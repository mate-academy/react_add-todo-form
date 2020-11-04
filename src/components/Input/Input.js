import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { StateShape } from '../shapes/StateShape';
import { actionTypes } from '../../reducer';
import './Input.css';

export const Input = ({ state, dispatch }) => {
  const { inputText, selectedUserId, inputWarnMessage } = state;

  const {
    changeInputTextType,
    showWarnType,
    clearInputWarnType,
  } = actionTypes;

  const inputClasses = classNames('AddTodoForm-input', {
    Error: inputWarnMessage,
  });

  const changeInputText = (event) => {
    const { value } = event.target;

    dispatch({
      type: changeInputTextType,
      payload: value,
    });
  };

  const handleFocusInput = () => {
    if (selectedUserId === 0) {
      dispatch({ type: showWarnType });
    }

    dispatch({ type: clearInputWarnType });
  };

  return (
    <>
      <input
        type="text"
        value={inputText}
        className={inputClasses}
        onChange={changeInputText}
        onFocus={handleFocusInput}
        placeholder="Write new task"
      />
      <div className="inputWarnMessage">{inputWarnMessage}</div>
    </>
  );
};

Input.propTypes = {
  state: PropTypes.shape(StateShape).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Input;
