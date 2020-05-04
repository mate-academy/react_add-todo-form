/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import FormError from '../FormError/FormError';

class NewTodo extends React.Component {
  state = {
    choosenUser: '',
    injectedTodo: '',
    isTaskComplete: false,
    isValidated: false,
    toDoInputError: '',
    userSelectionError: '',
  }

  handleChosenUser = (event) => {
    this.setState({ choosenUser: event.target.value });
  }

  handleTaskInout = (event) => {
    this.setState({ injectedTodo: event.target.value });
  }

  handleTaskStatus = (event) => {
    this.setState({ isTaskComplete: event.target.checked });
  }

  clearFields = () => {
    this.setState({
      injectedTodo: '',
      choosenUser: '',
      isTaskComplete: false,
    });
  }

  hasInputErrors = () => {
    if (this.state.choosenUser === '') {
      this.setState({
        userSelectionError: 'Please, choose the user',
      });
    } else if (this.state.injectedTodo.length < 4) {
      this.setState({
        toDoInputError: 'Your task should be more than 4 symbols',
      });
    } else {
      this.setState({
        isValidated: true,
      });
    }
  }

  render() {
    const { usersList, updateTodosList } = this.props;
    const { injectedTodo,
      choosenUser,
      isTaskComplete,
      isValidated,
      toDoInputError,
      userSelectionError } = this.state;

    return (
      <>
        <FormError
          isValidated={isValidated}
          toDoInputError={toDoInputError}
          userSelectionError={userSelectionError}
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.hasInputErrors();
            if (isValidated) {
              updateTodosList(e, injectedTodo, choosenUser, isTaskComplete);
              this.clearFields();
            }
          }
          }
        >
          <label>
            <input
              type="text"
              value={this.state.injectedTodo}
              onChange={this.handleTaskInout}
              placeholder="Please, enter the task"

            />
            Input task
          </label>

          <select value={choosenUser} onChange={this.handleChosenUser}>
            <option value="" disabled selected>Choose your name</option>
            {usersList.map(user => (
              <option value={user.name}>{user.name}</option>
            ))}
          </select>
          <label>
            is complete?
            <input
              type="checkbox"
              checked={this.state.isTaskComplete}
              onChange={this.handleTaskStatus}
            />
          </label>

          <input type="submit" value="submit" on />
        </form>
      </>
    );
  }
}

NewTodo.propsType = {
  updateTodosList: PropTypes.func.isRequired,
};

export default NewTodo;
