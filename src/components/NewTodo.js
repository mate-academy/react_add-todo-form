import React from 'react';
import PropTypes from 'prop-types';
import { users } from '../api/users';
import { SelectUser } from './SelectUser';

export class NewTodo extends React.Component {
  state = {
    todoTitle: '',
    userName: 'Select a user',
    titleError: false,
    emptyTitleError: false,
    userError: false,
    newTodoId: 3,
  }

  handleTitleChange = (event) => {
    this.setState({
      todoTitle: event.target.value.replace(/[^\s\w]/g, ''),
      titleError: false,
      emptyTitleError: false,
    });
  }

  handleUserChange = (event) => {
    this.setState({
      userName: event.target.value,
      userError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { addNewTodo } = this.props;

    if (this.state.userName === 'Select a user') {
      this.setState({
        userError: true,
      });
    } else if (this.state.todoTitle === '') {
      this.setState({
        titleError: true,
      });
    } else if (this.state.todoTitle.replace(/\s+/g, '').length === 0) {
      this.setState({
        emptyTitleError: true,
      });
    } else {
      const selectedUser = users
        .find(user => user.name === this.state.userName);

      this.setState(prevState => ({
        newTodoId: prevState.newTodoId + 1,
      }));

      addNewTodo({
        userId: selectedUser.id,
        id: this.state.newTodoId,
        title: this.state.todoTitle,
        completed: false,
      });

      this.setState({
        todoTitle: '',
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="title">
          {`Title: `}
        </label>
        {
          this.state.titleError
            ? (
              <span className="error">
                Please enter a title
              </span>
            )
            : (
              <span>
                {` `}
              </span>
            )
        }
        {
          this.state.emptyTitleError
            ? (
              <span className="error">
                Title consisting only of spaces is forbidden
              </span>
            )
            : (
              <span />
            )
        }
        <input
          type="text"
          id="title"
          name="title"
          maxLength={100}
          value={this.state.todoTitle}
          onChange={this.handleTitleChange}
        />
        {
          this.state.userError
            ? (
              <span className="error">
                Please select a user
              </span>
            )
            : (
              <span>
                {` `}
              </span>
            )
        }
        <SelectUser
          onChange={this.handleUserChange}
          selectedUser={this.state.userName}
        />
        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
};
