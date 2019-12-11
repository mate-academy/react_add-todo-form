import React from 'react';
import PropTypes from 'prop-types';
import users from './api/users';

class NewTodo extends React.Component {
  state = {
    inputValue: '',
    selectedValue: 0,
    inputError: false,
    selectError: false,
  };

  handleInput = (event) => {
    this.setState({ inputValue: event.target.value, inputError: false });
  };

  handleSelect = (event) => {
    this.setState({ selectedValue: event.target.value, selectError: false });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { inputValue, selectedValue } = this.state;

    if (!inputValue || !selectedValue) {
      this.setState({
        inputError: !inputValue,
        selectError: !selectedValue,
      });

      return;
    }

    this.props.addNewTodo(inputValue, selectedValue);

    this.setState({
      inputValue: '',
      selectedValue: 0,
    });
  };

  render() {
    const { inputValue, selectedValue, inputError, selectError } = this.state;

    return (
      <form className="form" onSubmit={this.handleFormSubmit}>
        <p className="form__text">Add a new task here: </p>
        <lable className="form__input">
          Title:
          <input
            value={inputValue}
            type="text"
            onChange={this.handleInput}
          />
          {inputError
          && <span className="form__error">Please, type a task title</span>}
        </lable>
        <lable>
          User:
          <select
            className="form__select"
            value={selectedValue}
            onChange={this.handleSelect}
          >
            <option value="0">Choose a user: </option>
            {users.map(user => (
              <option>{user.name}</option>
            ))}
          </select>
          {selectError
          && <span className="form__error">Please, choose a user name</span>}
        </lable>
        <button type="submit">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = { addNewTodo: PropTypes.func.isRequired };

export default NewTodo;
