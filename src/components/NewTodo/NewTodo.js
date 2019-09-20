import React, { Component } from 'react';
import Select from '../Select/Select';
import { NewTodoProps } from '../../constants/proptypes';

import './NewTodo.css';

class NewTodo extends Component {
  state = {
    value: '',
    selected: 0,
    inputError: null,
    selectError: null,
  };

  handleChange = ({ target }) => {
    this.setState({
      value: target.value,
    });
  };

  onClickSelect = ({ target }) => {
    this.setState({ selected: target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.selected < 1) {
      this.setState({
        selectError: 'Please select User',
      });
    } else if (this.state.value.length < 1) {
      this.setState({
        inputError: 'Please enter what needs Todo',
      });
    } else {
      this.props.onItemAdded(this.state.value, this.state.selected);
      this.setState({
        value: '',
        selected: 0,
        inputError: '',
        selectError: '',
      });
    }
  };

  render() {
    const {
      value,
      selected,
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
            selected={selected}
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
