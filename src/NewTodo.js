import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class NewTodo extends Component {
  state = {
    inputValue: '',
    selectValue: 0,
    inputError: false,
    selectError: false,
  }

  handleInputValue = (e) => {
    const target = e.target.value;

    if (target.trim() === '') {
      alert('введите буквы, или цифры');

      return;
    }

    this.setState({
      inputValue: target,
      inputError: false,
    });
  }

  handleSelectValue = (e) => {
    this.setState({
      selectValue: e.target.value,
      selectError: false,
    });
  }

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { inputValue, selectValue } = this.state;

    if (inputValue === '') {
      this.setState({
        inputError: !inputValue,
      });
    }

    if (!inputValue || !selectValue) {
      this.setState({
        inputError: !inputValue,
        selectError: !selectValue,
      });

      return;
    }

    this.props.addNewTodo(inputValue, selectValue);

    this.setState({
      inputValue: '',
      selectValue: 0,
    });
  }

  render() {
    const { inputValue, selectValue, selectError, inputError } = this.state;
    const { users } = this.props;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <span className="error">{inputError && 'Write a title'}</span>

        <input
          value={inputValue}
          onChange={this.handleInputValue}
          type="search"
          placeholder="write a title"
        />
        <span className="error">{selectError && 'Select User'}</span>
        <select
          value={selectValue}
          onChange={this.handleSelectValue}
        >
          <option value={0}>Select User</option>
          {users.map(user => (
            <option key={user.id}>{user.name}</option>
          ))}
        </select>
        <button type="submit">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addNewTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
