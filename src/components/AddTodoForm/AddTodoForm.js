import React, { useReducer } from 'react';
import './AddTodoForm.css';
import PropTypes from 'prop-types';
import { UserShape } from '../shapes/UserShape';
import { SelectUser } from '../SelectUser';
import { Input } from '../Input';
import { reducer } from '../../reducer';

const defaultState = {
  selectedUserId: 0,
  inputText: '',
  selectWarnMessage: '',
  inputWarnMessage: '',
};

export const AddTodoForm = ({ addTodo, users, lastTodoIndex }) => {
  const [state, dispatch] = useReducer(reducer, defaultState);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!state.inputText || state.selectedUserId === 0) {
      dispatch({
        type: 'SHOW_WARN',
        payload: state.inputText,
      });

      return;
    }

    addTodo(createTodo());
    dispatch({ type: 'SET_INIT_STATE' });
  };

  const createTodo = () => ({
    userId: state.selectedUserId,
    id: lastTodoIndex + 1,
    title: state.inputText,
    completed: false,
    user: users.find(user => user.id === state.selectedUserId),
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="AddTodoForm">
        <SelectUser
          state={state}
          dispatch={dispatch}
          users={users}
        />
        <Input state={state} dispatch={dispatch} />

        <button
          type="submit"
          className={
            state.selectedUserId && state.inputText
              ? 'AddTodoForm-btn'
              : 'AddTodoForm-btn disabled'
          }
        >
          +
        </button>
      </form>
    </>
  );
};

AddTodoForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape(UserShape)).isRequired,
  lastTodoIndex: PropTypes.number.isRequired,
};
