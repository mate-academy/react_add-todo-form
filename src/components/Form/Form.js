import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

export class Form extends React.Component {
  state = {
    title: null,
    userId: null,
    isTryToSend: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.title || !this.state.userId) {
      this.setState({
        isTryToSend: true,
      });

      return;
    }

    this.props.addToDo({
      title: this.state.title,
      userId: this.state.userId,
    });

    this.setState({
      title: null,
      userId: null,
      isTryToSend: false,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: name === 'userId' ? parseInt(value, 10) : value,
      isTryToSend: false,
    });
  }

  render() {
    const { title, userId, isTryToSend } = this.state;
    const { users } = this.props;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Enter a title of todo"
            name="title"
            className="form-input"
            value={title || ''}
            onChange={this.handleChange}
          />
          <select
            className="form-select"
            name="userId"
            value={userId || 'Choose a user'}
            onChange={this.handleChange}
          >
            <option value="">
              Choose a user
            </option>
            {
              users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
          </select>
          <button type="submit" className="form-button">
            Save new todo
          </button>
        </form>
        <div>
          {
            isTryToSend && !title
              && (
              <span className="error-message">
                Please, enter a title of todo...
              </span>
              )
          }
          {
            isTryToSend && !userId
              && (
              <span className="error-message">
                Please, select a user...
              </span>
              )
          }
        </div>
      </>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  addToDo: PropTypes.func.isRequired,
};
