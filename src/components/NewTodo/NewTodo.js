import React, { Component } from 'react';
import Select from '../Select/Select';
import { NewTodoProps } from '../../constants/proptypes';

import './NewTodo.css';

class NewTodo extends Component {
  state = {
    value: '',
    selectedUser: 0,
    inputError: null,
    selectError: null,
  };

  handleChange = ({ target }) => {
    if (this.state.value.length < 1 || this.state.value[0] === ' ') {
      this.setState({
        inputError: 'Please enter what needs Todo',
      });
    } else {
      this.setState({
        inputError: '',
      });
    }

    this.setState({
      value: target.value.trimStart(),
    });
  };

  onClickSelect = ({ target }) => {
    if (target.value < 1) {
      console.log('target.value: ', target.value);
      this.setState({
        selectError: 'Please select User',
      });
    } else {
      this.setState({
        selectedUser: target.value,
        selectError: '',
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.selectedUser < 1) {
      this.setState({
        selectError: 'Please select User',
      });
    } else if (this.state.value.length < 1) {
      this.setState({
        inputError: 'Please enter what needs Todo',
      });
    } else if (this.state.value === ' ') {
      this.setState({
        inputError: 'Please enter what needs Todo',
      });
    } else {
      this.props.onItemAdded(this.state.value, this.state.selectedUser);
      this.setState({
        value: '',
        selectedUser: 0,
        inputError: '',
        selectError: '',
      });
    }
  };

  render() {
    const {
      value,
      selectedUser,
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
            selectedUser={selectedUser}
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
