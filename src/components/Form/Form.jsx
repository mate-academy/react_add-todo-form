import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './Form.css';

export class Form extends Component {
  state = {
    title: '',
    userId: 0,
    value: '',
    isTitleCorrect: false,
    isUserIdCorrect: false,
  }

  handleSubmit = (submitEvent) => {
    let isInputsCorrect = true;
    const { title, userId } = this.state;

    submitEvent.preventDefault();

    if (title.trim().length === 0) {
      this.setState({ isTitleCorrect: true });
      isInputsCorrect = false;
    }

    if (userId === 0) {
      this.setState({ isUserIdCorrect: true });
      isInputsCorrect = false;
    }

    if (isInputsCorrect) {
      this.props.onAdd({
        title,
        userId,
        user: this.props.users.find(user => user.id === +userId),
      });
      this.setState({
        title: '',
        userId: 0,
        value: '',
        isTitleCorrect: false,
        isUserIdCorrect: false,
      });
    }
  }

  handleTyping = (typingEvent) => {
    this.setState({
      title: typingEvent.target.value,
    });

    if (this.state.title.trim.length === 0) {
      this.setState({
        isTitleCorrect: false,
      });
    }
  }

  handleSelect = (selectEvent) => {
    this.setState({
      userId: selectEvent.target.value,
      value: selectEvent.target.value,
    });

    if (this.state.title.trim.length === 0) {
      this.setState({
        isUserIdCorrect: false,
      });
    }
  }

  render() {
    const { title, value, isTitleCorrect, isUserIdCorrect } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="inputs">
          <label htmlFor="TODO-adder">
            <div className="title">Add a title</div>
            <input
              onChange={this.handleTyping}
              autoComplete="off"
              value={title}
              id="TODO-adder"
              placeholder="Here, please"
            />
          </label>

          <div>
            <select
              value={value}
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
          state={isTitleCorrect}
        />
        <ErrorMessage
          errorText="Please choose a user"
          state={isUserIdCorrect}
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
  onAdd: PropTypes.func.isRequired,
};
