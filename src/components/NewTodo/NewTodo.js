import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import users from '../../api/users';
import './NewTodo.css';

export class NewTodo extends React.Component {
  state = {
    userId: '',
    todoName: '',
    validInput: true,
    validUser: true,
  }

  handleChange = ({ target: { name, value } }) => {
    const isTodoNameValid
      = name === 'todoName' && (value && value.search(/\w/) !== -1);
    const isSelectValid = name === 'userId' && value !== '';

    if (isTodoNameValid) {
      this.setState({
        validInput: true,
      });
    }

    if (isSelectValid) {
      this.setState({
        validUser: true,
      });
    }

    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { addTodo, maxId } = this.props;
    const newId = maxId + 1;

    const newTodoItem = {
      title: this.state.todoName,
      userId: this.state.userId,
    };

    const goodTitle = newTodoItem.title.trim().replace(/\s+/g, ' ');
    const newTodo = {
      user: users.find(usr => usr.id === +newTodoItem.userId),
      userId: newTodoItem.userId,
      id: newId,
      title: goodTitle,
      completed: false,
    };

    let validInput = true;
    let validUser = true;
    let validBoth = true;

    if (newTodoItem.title && newTodoItem.title.search(/\w/) !== -1) {
      validInput = true;
    } else {
      validInput = false;
    }

    if (newTodoItem.userId === '') {
      validUser = false;
    } else {
      validUser = true;
    }

    validBoth = validUser && validInput;

    if (validBoth) {
      addTodo(newTodo, newId);
    }

    this.setState(prevState => ({
      ...prevState,
      validInput,
      validUser,
      userId: (!validBoth && validUser) ? prevState.userId : '',
      todoName: (!validBoth && validInput) ? prevState.todoName : '',
    }));
  };

  render() {
    const options = users.map(user => (
      <option
        key={user.id}
        value={user.id}
      >
        {user.name}
      </option>
    ));

    return (
      <form
        name="addTodo"
        className="form"
        onSubmit={this.handleSubmit}
      >
        <label
          className={cn('label', { 'wrong-input': !this.state.validInput })}
        >
          Name of ToDo
          <input
            name="todoName"
            type="text"
            id="title"
            className="todoName"
            placeholder="Type TODO title"
            onChange={this.handleChange}
            value={this.state.todoName}
          />
        </label>
        <br />
        <label
          className={cn('label', { 'not-chosen': !this.state.validUser })}
        >
          Select user:
          <select
            name="userId"
            className="todoUser"
            value={this.state.userId}
            onChange={this.handleChange}
          >
            <option value="" disabled>--Please choose a user--</option>
            {options}
          </select>
        </label>
        <br />
        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  maxId: PropTypes.number.isRequired,
};
