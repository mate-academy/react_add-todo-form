import React from 'react';
import PropTypes from 'prop-types';

import { Select } from '../../utils/Select';

export class Form extends React.Component {
  state = {
    title: '',
    isValidTitle: true,
    userId: '',
    userName: '',
    isUserSelected: true,
    completed: false,
  };

  getUserFromDropdown(id) {
    const userObj = this.props.users.find(user => user.id === id);

    return !userObj || {
      userName: userObj.name,
      userId: userObj.id,
    };
  }

  // For we can include all widely used special symbols,
  // as an approach of title validation that consists not only
  // latin characters: /\`|\~|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\+|\=|
  // \[|\{|\]|\}|\||\\|\<|\,|\>|\?|\/|\""|\;|\:/g
  handleChange = (ev) => {
    const { name, type, checked } = ev.target;
    let { value } = ev.target;

    if (name === 'title') {
      value = value.replace(/[^0-9A-Za-z ']/g, '');
    }

    this.setState({ [name]: type === 'checkbox' ? checked : value });
  };

  selectUser = (user) => {
    this.setState({
      userId: user.id,
      userName: user.name,
    });
  }

  submitForm = (ev) => {
    ev.preventDefault();

    const newItem = {
      id: this.props.newItemId,
      title: this.state.title,
      completed: this.state.completed,
      user: this.getUserFromDropdown(this.state.userId * 1),
    };

    if (this.validate()) {
      this.props.addItem(newItem);

      this.setState({
        title: '',
        isValidTitle: true,
        userId: '',
        isUserSelected: true,
      });
    }
  }

  validate() {
    let fieldsValid = true;
    const { userId, title } = this.state;

    // Validate select
    if (!userId) {
      fieldsValid = false;
    }

    this.setState({
      isUserSelected: !!userId,
    });

    // Validate title
    if (!title) {
      fieldsValid = false;
    }

    this.setState({
      isValidTitle: !!title,
    });

    return fieldsValid;
  }

  render() {
    return (
      <form onSubmit={this.submitForm}>
        <fieldset>
          <label htmlFor="title" className="d-none">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Add title"
            maxLength="35"
            value={this.state.title}
            onChange={this.handleChange}
          />
          {!this.state.isValidTitle && (
            <p className="error-message">
              Please enter the title
            </p>
          )}
        </fieldset>

        <fieldset>
          <label htmlFor="completed">Is completed?</label>
          <input
            type="checkbox"
            id="completed"
            name="completed"
            placeholder="Complete status"
            checked={this.state.completed}
            onChange={this.handleChange}
          />
        </fieldset>

        <fieldset>
          <label htmlFor="userId" className="d-none">User ID:</label>
          <select
            id="userId"
            name="userId"
            value={this.state.userId}
            onChange={this.handleChange}
          >
            <option value="">
              Choose a user
            </option>
            {this.props.users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <Select
            users={this.props.users}
            userName={this.state.userName}
            onChange={this.selectUser}
          />
          {!this.state.isUserSelected && (
            <p className="error-message">
              Please choose a user
            </p>
          )}
        </fieldset>

        <button type="submit">Add</button>
      </form>
    );
  }
}

Form.propTypes = {
  newItemId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  addItem: PropTypes.func.isRequired,
};
