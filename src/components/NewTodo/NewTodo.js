import React, { Component } from 'react';
import Select from '../Select/Select';
import { NewTodoProps } from '../../constants/proptypes';

import './NewTodo.css';

class NewTodo extends Component {
  state = {
    value: '',
    selectedByDefault: 0,
    inputError: null,
    selectError: null,
  };

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  onClickSelect = (event) => {
    this.setState({ selectedByDefault: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.selectedByDefault === 0) {
      this.setState({
        selectError: 'Please select User',
      });
    } else if (this.state.value === '' || this.state.value === ' ') {
      this.setState({
        inputError: 'Please enter what needs Todo',
      });
    }

    this.props.onItemAdded(this.state.value, this.state.selectedByDefault);
    this.setState({
      value: '',
      selectedByDefault: 0,
    });
  };

  render() {
    const {
      value,
      selectedByDefault,
      inputError,
      selectError,
    } = this.state;
    const { users } = this.props;

    return (
      <div className="add-todo-container">
        <form
          className="add-todo-form"
          onSubmit={this.handleSubmit}
        >
          <input
            className="form-control"
            placeholder="What needs to be done"
            type="text"
            value={value}
            onChange={this.handleChange}
          />
          {inputError !== null && (
            <p className="invalid-feedback error error--input">
              {inputError}
            </p>
          )}
          <Select
            users={users}
            selectedByDefault={selectedByDefault}
            onChange={this.onClickSelect}
          />
          {selectError !== null && (
            <p className="invalid-feedback error error--select">
              {selectError}
            </p>
          )}
          <button type="submit">Add todo</button>
        </form>
      </div>
    );
  }
}

NewTodo.propTypes = NewTodoProps;

export default NewTodo;
