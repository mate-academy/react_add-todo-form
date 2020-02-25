import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from './Select';

export class NewTodo extends Component {
  state = {
    users: this.props.users,
    inputedTitle: '',
    id: 3,
    userId: 0,
    errors: false,
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
    const { inputedTitle, userId } = this.state;

    if (inputedTitle.length > 0 && userId > 0) {
      const newTodo = {
        id: this.state.id,
        title: inputedTitle,
        userId,
      };

      this.props.addNewTodo(newTodo);

      this.setState(prevState => ({
        inputedTitle: '',
        userId: 0,
        id: prevState.id + 1,
        errors: false,
      }));
    } else {
      this.setState({
        errors: true,
      });
    }
  }

  render() {
    const { users, inputedTitle, userId, errors } = this.state;

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
            userId={userId}
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
        <div className={!errors ? 'errors--hiden' : 'errors'}>
          <div
            className={inputedTitle !== '' ? 'errors--hiden' : 'errors'}
          >
              Please enter some !
          </div>
          <div className={userId !== 0 ? 'errors--hiden' : 'errors'}>
            ChooseUser
          </div>
        </div>
      </>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  addNewTodo: PropTypes.func.isRequired,
};
