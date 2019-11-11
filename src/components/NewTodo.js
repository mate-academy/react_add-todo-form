import React, { Component } from 'react';

import users from '../api/users';

class NewTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      selectValue: '',
      titleError: '',
      selectError: '',
    };

    this.inputRef = React.createRef();
    this.selectRef = React.createRef();
  }

  addTitle = (event) => {
    this.setState({ inputValue: event.target.value.replace(/\s\W/g, '') });
  }

  addUserId = (event) => {
    this.setState({ selectValue: event.target.value });
  }

  clearInput = (event) => {
    this.setState({ titleError: '' });
  }

  clearSelect = (event) => {
    this.setState({ selectError: '' });
  }

  createNewTodo = (event) => {
    event.preventDefault();

    const userId = +this.state.selectValue;
    const title = this.state.inputValue;

    if (title === '') {
      this.setState({ titleError: 'Please enter the title' });
    } else if (userId === 0) {
      this.setState({ selectError: 'Please enter a user' });
    } else {
      // eslint-disable-next-line react/prop-types
      const { receiveNewTodo } = this.props;

      receiveNewTodo(userId, title);

      this.setState({
        inputValue: '',
        selectValue: '',
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.createNewTodo}>
        <input
          ref={this.inputRef}
          placeholder="title"
          type="text"
          onChange={this.addTitle}
          onClick={this.clearInput}
          value={this.state.inputValue}
        />
        <span>{this.state.titleError}</span>
        <select
          ref={this.selectRef}
          onChange={this.addUserId}
          onClick={this.clearSelect}
          value={this.state.selectValue}
        >
          <option value="" />
          {users.map(item => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <span>{this.state.selectError}</span>
        <button type="submit">
          Add Todo
        </button>
      </form>
    );
  }
}

export default NewTodo;
