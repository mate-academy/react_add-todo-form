import React, { Component } from 'react';
import Select from '../Select/Select';
import { NewTodoProps } from '../../constants/proptypes';

import './NewTodo.css';

class NewTodo extends Component {
  state = {
    value: '',
    selectedByDefault: 0,
    error: null,
  };

  handleChange = (event) => {
    const isValid = !!(event.target.value !== '' || event.target.value !== ' ');

    console.log('isValid: ', isValid);

    this.setState({
      value: event.target.value,
      error: isValid
        ? null
        : 'error',
    });
  }

  onClickSelect = (event) => {
    this.setState({ selectedByDefault: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.onItemAdded(this.state.value, this.state.selectedByDefault);
    this.setState({
      value: '',
      selectedByDefault: 0,
    });
  }

  render() {
    const { value, error } = this.state;
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
          {error && (
            <p className="invalid-feedback">
              {error}
            </p>
          )}
          <Select
            users={users}
            onChange={this.onClickSelect}
          />
          <button type="submit">Add todo</button>
        </form>
      </div>
    );
  }
}

NewTodo.propTypes = NewTodoProps;

export default NewTodo;
