import React from 'react';
import PropTypes from 'prop-types';
import users from './api/users';

class NewTodo extends React.Component {
  state = {
    inputValue: '',
    selectValue: 0,
    inputError: false,
    selectError: false,
  };

  handleInputValue = (e) => {
    this.setState({
      inputValue: e.target.value,
      inputError: false,
    });
  };

  handleSelectValue = (e) => {
    this.setState({
      selectValue: e.target.value,
      selectError: false,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();

    const { inputValue, selectValue } = this.state;

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
  };

  render() {
    const { inputValue, selectValue, inputError, selectError } = this.state;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={this.handleInputValue}
          className="input"
          placeholder="write a title"
        />

        <div className="error">{inputError && 'Write a title'}</div>
        <div>
          <select
            className="select"
            value={selectValue}
            onChange={this.handleSelectValue}
          >
            <option className="option" value="0">
              Select user
            </option>
            {users.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          <div className="error">{selectError && 'Select User'}</div>
        </div>
        <button type="submit" className="button">
          Add
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = { addNewTodo: PropTypes.func.isRequired };

export default NewTodo;
