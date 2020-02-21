import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from './Select';

export class NewTodo extends Component {
  state = {
    users: this.props.users,
    inputedTitle: '',
    id: 3,
    userId: 0,
  }

  titleTodo = (event) => {
    this.setState({
      inputedTitle: event.target.value,
    });
  }

  selectUserId = (event) => {
    this.setState({
      userId: Number(event.target.value),
    });
  }

  addTodo = (event) => {
    event.preventDefault();

    const newTodo = {
      id: this.state.id,
      title: this.state.inputedTitle,
      userId: this.state.userId,
    };

    this.props.addNewTodo(newTodo);

    this.setState(prevState => ({
      inputedTitle: '',
      userId: 0,
      id: prevState.id + 1,
    }));
  }

  render() {
    const { users, inputedTitle } = this.state;

    return (
      <>
        <form
          className="todo-form"
          onSubmit={this.addTodo}
        >
          <input
            type="text"
            placeholder="Enter your new TODO"
            onChange={this.titleTodo}
            value={inputedTitle}
          />
          <Select
            userId={this.state.userId}
            users={users}
            selectUserId={this.selectUserId}
          />
          <button
            type="submit"
            className="todo-form__button"
          >
          v Add
          </button>
        </form>
      </>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addNewTodo: PropTypes.func.isRequired,
};
