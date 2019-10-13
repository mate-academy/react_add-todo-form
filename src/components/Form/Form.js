import React, { Component } from 'react';

import propTypes from 'prop-types';
import cx from 'classnames';
import './Form.css';
import FormField from '../FormField/FormField';

const initialState = {
  title: {
    value: '',
    error: null,
  },
  selectedUser: {
    value: '',
    error: null,
  },
};

class Form extends Component {
  state = initialState;

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: { value, error: null },
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { selectedUser, title } = this.state;
    const { handleAddTodo } = this.props;
    const { hasError, errors } = this.validate();

    if (hasError) {
      this.setState((prevState) => {
        const newState = errors.map(([name, error]) => [
          name,
          {
            error,
            value: prevState[name].value,
          },
        ]);

        return Object.fromEntries(newState);
      });
    } else {
      handleAddTodo({
        title,
        selectedUser,
      });
      this.setState(initialState);
    }
  }

  validate = () => {
    const errors = Object.entries(this.state).map(([name, fieldData]) => {
      const validator = formValidators[name];
      const error = validator
        ? validator(name, fieldData.value)
        : null;

      return [name, error];
    });

    const hasError = errors.some(errorData => !!errorData[1]);

    return {
      hasError,
      errors,
    };
  }

  render() {
    const { users } = this.props;
    const { title, selectedUser } = this.state;
    const selectClass
      = cx('select', { 'select error-select': !!selectedUser.error });

    return (
      <form
        onSubmit={this.handleSubmit}
        className="new-todo"
      >
        <FormField
          {...title}
          name="title"
          type="text"
          label="title"
          placeholder="Please type in"
          onChange={this.handleChange}
        />

        <select
          onChange={this.handleChange}
          name="selectedUser"
          className={selectClass}
          defaultValue="0"
        >
          <option value="0" selected disabled hidden>Select user</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {selectedUser.error
          && (<p className="error-message">{selectedUser.error}</p>)}

        <button type="submit" className="submit">Ad TODO</button>
      </form>
    );
  }
}

const required = (title, value) => (value.trim()
  ? null
  : `${title} is required field`);

const formValidators = {
  title: required,
  selectedUser: required,
};

Form.propTypes = {
  value: propTypes.string.isRequired,
  users: propTypes.shape(Form).isRequired,
  handleAddTodo: propTypes.func.isRequired,
};

export default Form;
