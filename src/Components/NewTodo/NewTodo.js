/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    choosenUser: '',
    injectedTodo: '',
    isTaskComplete: false,
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

  render() {
    const { usersList, updateTodosList } = this.props;
    const { injectedTodo, choosenUser, isTaskComplete } = this.state;

    return (

      <form
        onSubmit={
          e => updateTodosList(e, injectedTodo, choosenUser, isTaskComplete)
        }
      >
        <label>
          <input
            type="text"
            value={this.state.injectedTodo}
            onChange={this.handleTaskInout}
            placeholder="Please, enter the task"
            required
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
    );
  }
}

NewTodo.propsType = {
  updateTodosList: PropTypes.func.isRequired,
};

export default NewTodo;
