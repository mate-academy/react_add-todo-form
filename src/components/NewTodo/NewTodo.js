import React from 'react';
import PropTypes from 'prop-types';
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
    if (name === 'todoName'
      && (value && value.search(/\w/) !== -1)) {
      this.setState({
        validInput: true,
      });
    }

    if (name === 'userId'
      && value !== '') {
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
    const newTodoItem = {
      title: this.state.todoName,
      userId: this.state.userId,
    };
    const newId = maxId + 1;
    const newTodo = {
      user: users.find(usr => usr.id === +newTodoItem.userId),
      userId: newTodoItem.userId,
      id: newId,
      title: newTodoItem.title,
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
          className={this.state.validInput ? '' : 'wrong-input'}
        >
          Name of ToDo
          <input
            name="todoName"
            type="text"
            id="title"
            className="input"
            placeholder="Type TODO title"
            onChange={this.handleChange}
            value={this.state.todoName}
          />
        </label>
        <br />
        <label
          className={this.state.validUser ? '' : 'not-chosen'}
        >
          Select user:
          <select
            name="userId"
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
