import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Select.css';

export default class Select extends Component {
  state = {
    userId: 0,
    title: '',
    inputError: false,
    selectError: false,
  };

  handleSetName = (e) => {
    this.setState({
      selectError: false,
      userId: +e.target.value,
    });
  };

  handleSetTodoItem = (e) => {
    const todoToAdd = e.target.value;

    this.setState({
      inputError: false,
      title: todoToAdd,
    });
  };

  handleFormSubmit = (e) => {
    const { updateMainState } = this.props;

    e.preventDefault();
    const { userId, title } = this.state;

    if (+userId === 0) {
      this.setState({ selectError: true });

      return;
    }

    if (title === '') {
      this.setState({ inputError: true });

      return;
    }

    updateMainState(userId, title);
    this.setState({
      title: '',
      userId: '0',
    });
  };

  render() {
    const { usersForSelection } = this.props;
    const { selectError, userId, title, inputError } = this.state;
    const users = usersForSelection
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(user => (
        <option
          value={user.id}
          key={user.name}
        >
          {user.name}
        </option>
      ));

    return (
      <div>
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Choose a User</span>
            <form onSubmit={this.handleFormSubmit} className="form">
              {selectError && (
                <span className="warning">
                  Please, select user
                </span>
              )}
              <select
                value={userId}
                onChange={this.handleSetName}
                className="custom-select"
              >
                <option value="0">Select a user</option>
                {users}
              </select>
              <label htmlFor="Search">
                <input
                  onChange={this.handleSetTodoItem}
                  value={title}
                  placeholder="input TODO for adding"
                  type="text"
                  name="name"
                />
              </label>
              {inputError && (
                <span
                  style={{ color: 'red' }}
                >
                  Please, add Todo
                </span>
              )
              }
              <button
                className="btn waves-effect waves-light"
                type="submit"
                name="action"
              >
                Submit
                <i className="material-icons right">send</i>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  usersForSelection: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateMainState: PropTypes.func.isRequired,
};
