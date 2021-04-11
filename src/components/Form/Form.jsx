import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import users from '../../api/users';

export class Form extends React.Component {
  state = {
    todoTitle: '',
    selectedNameId: 0,
    todoError: false,
    nameError: false,
  }

  handleTodo = (e) => {
    this.setState({
      todoTitle: e.target.value,
      todoError: false,
    });
  }

  handleName = (e) => {
    this.setState({
      selectedNameId: +e.target.value,
      nameError: false,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { todoTitle, selectedNameId } = this.state;

    if (!todoTitle || !selectedNameId) {
      this.setState({
        todoError: !selectedNameId,
        nameError: !todoTitle,
      });

      return;
    }

    this.props.addTodo(todoTitle, selectedNameId);

    this.setState({
      todoTitle: '',
      selectedNameId: 0,
    });
  }

  render() {
    const { todoTitle, selectedNameId, todoError, nameError } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={todoTitle}
          placeholder="Enter the title"
          onChange={this.handleTodo}
        />
        {todoError && (
        <div className="error">
          Please enter the title
        </div>
        )}

        <select
          value={selectedNameId}
          onChange={this.handleName}
        >
          <option value="0">
            Please choose a user
          </option>
          {users.map(({ id, name }) => (
            <option
              key={uuidv4()}
              value={id}
            >
              {name}
            </option>
          ))}
        </select>
        {nameError && (
        <div className="error">
          User not selected
        </div>
        )}

        <button
          type="submit"
        >
          Add
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
};
