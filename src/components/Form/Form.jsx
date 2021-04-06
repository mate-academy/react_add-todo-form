import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './Form.css';

export class Form extends Component {
  state = {
    title: '',
    userId: '',
    hasTitleError: false,
    hasUserIdError: false,
  }

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    const { title, userId } = this.state;
    let isInputsCorrect = true;

    if (title.trim().length === 0) {
      this.setState({ hasTitleError: true });
      isInputsCorrect = false;
    }

    if (userId === '') {
      this.setState({ hasUserIdError: true });
      isInputsCorrect = false;
    }

    if (isInputsCorrect) {
      this.props.onSubmit({
        title,
        userId,
        user: this.props.users.find(user => user.id === +userId),
      });
      this.setState({
        title: '',
        userId: '',
        hasTitleError: false,
        hasUserIdError: false,
      });
    }
  }

  handleTyping = (typingEvent) => {
    this.setState({
      title: typingEvent.target.value,
    });

    if (this.state.title.trim.length === 0) {
      this.setState({
        hasTitleError: false,
      });
    }
  }

  handleSelect = (selectEvent) => {
    this.setState({
      userId: selectEvent.target.value,
      selectId: selectEvent.target.value,
    });

    if (this.state.title.trim.length === 0) {
      this.setState({
        hasUserIdError: false,
      });
    }
  }

  render() {
    const {
      title,
      userId,
      hasTitleError,
      hasUserIdError
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="inputs">
          <label htmlFor="todo-adder">
            <div className="title">Add a title</div>
            <input
              onChange={this.handleTyping}
              autoComplete="off"
              value={title}
              id="todo-adder"
              className="todo-adder"
              placeholder="Here, please"
            />
          </label>

          <div>
            <select
              value={userId}
              name="user"
              onChange={this.handleSelect}
              className="user-select"
            >
              <option disabled value="">
                Choose a user
              </option>
              {this.props.users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

        </div>
        <button type="submit" className="add">Add</button>

        <ErrorMessage
          errorText="Please enter the title"
          hasError={hasTitleError}
        />
        <ErrorMessage
          errorText="Please choose a user"
          hasError={hasUserIdError}
        />
      </form>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
