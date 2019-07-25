import React from 'react';
import PropTypes from 'prop-types';

import users from '../api/users';

class NewTodo extends React.Component {
  state = {
    initialStates: {
      userId: '',
      todo: '',
    },
    errors: {
      userId: false,
      todo: false,
    },
  }

  handleChange = (event) => {
    const field = event.target.name;
    const newVal = event.target.value
      .replace(/[^A-Za-z0-9_\s]/, '');

    this.setState(prevState => ({
      initialStates: {
        ...prevState.initialStates,
        [field]: newVal,
      },
      errors: {
        userId: false,
        todo: false,
      },
    }));
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const state = {};

    const { userId, todo } = this.state.initialStates;

    const checkErrors = (name, field) => {
      if (!field) {
        state[name] = true;
      }
    };

    checkErrors('userId', userId);
    checkErrors('todo', todo);

    if (Object.keys(state).length > 0) {
      this.setState({
        errors: { ...state },
      });
    } else {
      this.props.handleSubmit(userId, todo);

      this.setState({
        initialStates: {
          userId: '',
          todo: '',
        },
      });
    }
  }

  render() {
    const { initialStates: { userId, todo } }
      = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          name="todo"
          placeholder="Please enter your to do task"
          value={todo}
          onChange={this.handleChange}
          className="text-input"
        />
        {this.state.errors.todo
        && <p className="error">Please enter the title</p>}
        <select
          name="userId"
          id="userId"
          value={userId}
          onChange={this.handleChange}
          className="select-input"
        >
          <option
            value=""
            disabled
          >
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {this.state.errors.userId
        && <p className="error">Please choose the user</p>}
        <button type="submit">Add task</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default NewTodo;
