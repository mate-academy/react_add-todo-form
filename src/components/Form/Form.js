import React, { Component } from 'react';
import users from '../../api/users';
import { TodoListProps } from '../TodoProps';
import './Form.css';

class Form extends Component {
  state = {
    todoTitle: '',
    newUser: '',
    isTitle: false,
    isUser: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });

    if (this.state.todoTitle.length >= 0) {
      this.setState({
        isTitle: false,
      });
    }

    if (this.state.todoTitle.length >= 0) {
      this.setState({
        isUser: false,
      });
    }
  }

  addUser = (event) => {
    const { addTodo } = this.props;

    event.preventDefault();

    if (this.state.newUser && this.state.todoTitle.trim()) {
      this.setState(prevState => ({
        newTodo: {
          title: prevState.todoTitle,
          completed: false,
          user: {
            name: prevState.newUser,
            userId: prevState.userId,
          },
        },
      }),
      () => addTodo(this.state.newTodo));
      this.reset();
    }

    if (!this.state.todoTitle.trim()) {
      this.setState({ isTitle: true });
    }

    if (!this.state.newUser) {
      this.setState({ isUser: true });
    }
  }

  reset = () => {
    this.setState({
      todoTitle: '',
      newUser: '',
      isTitle: false,
      isUser: false,
    });
  }

  render() {
    return (
      <form
        onSubmit={this.addUser}
        className="form"
      >
        <input
          id="title"
          type="text"
          name="todoTitle"
          value={this.state.todoTitle}
          onChange={this.handleChange}
          placeholder="Enter the title"
        />
        <label htmlFor="title">
          {this.state.isTitle && <p>Please enter the title</p>}
        </label>
        <select
          id="user"
          name="newUser"
          onChange={this.handleChange}
          value={this.state.newUser}
        >
          <option>Please choose a user</option>
          {users.map(user => (
            <option
              value={user.name}
              key={user.id}
            >
              {user.name}
            </option>
          ))}

        </select>
        <label htmlFor="title">
          {this.state.isUser && <p>Please choose a user</p>}
        </label>
        <button type="submit">
          Add
        </button>
      </form>
    );
  }
}

Form.propTypes = TodoListProps;

export default Form;
