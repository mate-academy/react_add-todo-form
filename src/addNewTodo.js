import './App.css';
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

    handleInputValue = (element) => {
      this.setState({
        inputValue: element.target.value,
        inputError: false,
      });
    };

    handleSelectValue = (element) => {
      this.setState({
        selectValue: element.target.value,
        selectError: false,
      });
    };

    handleFormSubmit = (element) => {
      element.preventDefault();

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
            placeholder="write title"
          />

          <div className="error">{inputError && 'need title'}</div>
          <div>
            <select
              value={selectValue}
              onChange={this.handleSelectValue}
            >
              <option value="0">
              Choose a user
              </option>
              {users.map(user => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>
            <div className="error">{selectError && 'need User'}</div>
          </div>
          <button type="submit">
            Add
          </button>
        </form>
      );
    }
}

NewTodo.propTypes = { addNewTodo: PropTypes.func.isRequired };

export default NewTodo;
