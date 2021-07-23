import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export class Form extends PureComponent {
  state = {
    todoTitle: '',
    userName: '',
    isValidInput: false,
    isValidSelect: false,
  }

  changeTitle = event => this.setState({
    todoTitle: event.target.value,
    isValidInput: !event.target.value.length,
  })

  changeUserName = event => this.setState({
    userName: event.target.value,
    isValidSelect: !event.target.value.length,
  })

  resetForm = () => this.setState({
    todoTitle: '',
    userName: '',
    isValidInput: false,
    isValidSelect: false,
  })

  addNewTodo = (event) => {
    event.preventDefault();

    if (this.state.userName && this.state.todoTitle.trim()) {
      this.setState(prevState => ({
        newTodo: {
          title: prevState.todoTitle,
          completed: false,
          user: {
            name: prevState.userName,
            userId: prevState.userId,
          },
        },
      }),
      () => this.props.addTodo(this.state.newTodo));
      this.resetForm();
    }

    if (!this.state.todoTitle.trim()) {
      this.setState({ isValidInput: true });
    }

    if (!this.state.userName) {
      this.setState({ isValidSelect: true });
    }
  }

  render() {
    return (
      <form onSubmit={this.addNewTodo}>
        <input
          type="text"
          id="title"
          name="todoTitle"
          onChange={this.changeTitle}
          value={this.state.todoTitle}
          placeholder="Enter the title"
        />
        <label htmlFor="title">
          {this.state.isValidInput && <b>Please enter the title</b>}
        </label>
        <select
          name="userNames"
          onChange={this.changeUserName}
          value={this.state.userName}
        >
          <option value="0">Choose a user</option>
          {this.props.users.map(user => (
            <option
              key={user.id}
              value={user.name}
            >
              {user.name}
            </option>
          ))}
        </select>
        {this.state.isValidSelect && <b>Please choose a user</b>}
        <button type="submit">Add</button>
      </form>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
