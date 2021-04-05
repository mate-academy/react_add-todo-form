import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import './Form.css';

export class Form extends Component {
  state = {
    title: '',
    userId: '',
    isTitleCorrect: false,
    isUserIdCorrect: false,
  }

  handleSubmit = (submitEvent) => {
    submitEvent.preventDefault();

    const { title, userId } = this.state;
    let isInputsCorrect = true;

    if (title.trim().length === 0) {
      this.setState({ isTitleCorrect: true });
      isInputsCorrect = false;
    }

    if (userId === '') {
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
        userId: '',
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
      selectId: selectEvent.target.value,
    });

    if (this.state.title.trim.length === 0) {
      this.setState({
        isUserIdCorrect: false,
      });
    }
  }

  render() {
    const {
      title,
      userId,
      isTitleCorrect,
      isUserIdCorrect
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
  onSubmit: PropTypes.func.isRequired,
};
