import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
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
    const regExp = /^\s/;
    const title = event.target.value.replace(regExp, '');

    this.setState({
      inputedTitle: title,
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
        <div className={cn({
          'errors--hiden': !errors,
          errors,
        })}
        >
          <div
            className={cn({
              'errors--hiden': inputedTitle !== '',
              errors,
            })}
          >
              Please enter some !
          </div>
          <div className={cn({
            'errors--hiden': userId !== 0,
            errors,
          })}
          >
            ChooseUser
          </div>
        </div>
      </>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  addNewTodo: PropTypes.func.isRequired,
};
