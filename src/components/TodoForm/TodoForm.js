import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TodoForm extends Component {
  state = {
    label: '',
    userId: 0,
    userError: false,
    titleError: false,
  };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
      titleError: false,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (!this.state.userId || !this.state.label) {
      this.setState(state => ({
        titleError: !state.label,
        userError: !state.userId,
      }));

      return;
    }

    this.props.onItemAdded(
      this.state.label,
      this.state.userId,
    );
  };

  onUserChange = (value) => {
    this.setState({
      userId: value,
      userError: false,
    });
  };

  render() {
    const { users } = this.props;
    const { userId } = this.state;

    return (
      <>
        <div>
          {this.state.titleError && (
            <span className="errors">please enter todo-task </span>
          )}

          <br />
          {this.state.userError && (
            <span className="errors">please choose user </span>
          )}
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            onChange={this.onLabelChange}
            placeholder="What needs to be done?"
          />

          <button type="submit">Add Item</button>
          <p>
            {this.state.userError}
            {this.state.titleError}
          </p>

          <div>Choose a user please:</div>

          <section>
            <select
              id="user-selection"
              onChange={(event) => {
                this.onUserChange(+event.target.value);
              }}
              value={userId}
            >
              <option>{' '}</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </section>
        </form>
      </>
    );
  }
}

TodoForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
