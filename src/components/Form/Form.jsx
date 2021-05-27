import React from 'react';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    titleValue: '',
    titleError: false,
    userValue: 0,
    userError: false,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState(state => ({
      titleError: !state.titleValue,
      userError: !state.userValue,
    }));

    if (!this.state.titleValue) {
      return;
    }

    if (!this.state.userValue) {
      return;
    }

    this.props.addTodo(this.state.titleValue, this.state.userValue);

    this.setState({
      titleValue: '',
      userValue: 0,
    });
  }

  handleTitleChange = (event) => {
    this.setState({
      titleValue: event.target.value,
      titleError: false,
    });
  }

  handleUserChange = (event) => {
    this.setState({
      userValue: +event.target.value,
      userError: false,
    });
  }

  render() {
    const {
      titleValue,
      titleError,
      userValue,
      userError,
    } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <div>
          <label htmlFor="title">Todo title</label>
          <input
            id="title"
            type="text"
            placeholder="Please enter title"
            value={titleValue}
            onChange={this.handleTitleChange}
          />
          {titleError && <span>Please enter the title</span>}
        </div>

        <div>
          <label htmlFor="user">Select user</label>
          <select
            id="user"
            value={userValue}
            onChange={this.handleUserChange}
          >
            <option
              key={0}
              value={0}
            >
              Please choose a user
            </option>

            {this.props.users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span>Please choose a user</span>}
        </div>

        <button type="submit">Add</button>
      </form>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
