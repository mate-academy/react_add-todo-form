import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TodoForm extends Component {
  state = {
    label: '',
    userId: '',
  };

  onLabelChange = (e) => {
    this.setState({ label: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.onItemAdded(this.state.label, this.state.userId);
  };

  onUserChange = (value) => {
    this.setState({ userId: value });
  };

  render() {
    const { users } = this.props;
    const { userId } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
        />
        <button type="submit">Add Item</button>

        <br />

        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="user-selection">
          Choose a user please:
        </label>
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
    );
  }
}

TodoForm.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};
