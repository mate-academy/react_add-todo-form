import React from 'react';
import './NewTodo.css';
import { required } from '../required';

const initialState = {
  title: {
    value: '',
    error: null,
  },
  userId: {
    value: '',
    error: null,
  },
};

const formValidators = {
  title: required,
  userId: required,
};

class NewTodo extends React.Component {
  state = initialState;

  getFormValue() {
    return Object.entries(this.state)
      .reduce((acc, entry) => (
        {
          ...acc,
          [entry[0]]: entry[1].value,
        }
      ), {});
  }

  handleUserInput = ({ target: { name, value } }) => {
    this.setState(prevState => ({
      [name]: {
        value,
        error: prevState[name].error,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { addTodo } = this.props;
    const formValue = this.getFormValue();

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
      this.setState(initialState);
      addTodo(formValue);
    }
  };

  validate() {
    const errors = Object.entries(this.state)
      .map(([name, fieldData]) => {
        const validator = formValidators[name];
        const error = validator
          ? validator(name, fieldData.value)
          : null;

        return [name, error];
      });

    const hasError = errors
      .some(errorData => !!errorData[1]);

    return {
      hasError,
      errors,
    };
  }

  render() {
    const { users } = this.props;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="addForm"
      >

        <div className="input-field">
          <input
            className={
              `input-field--input 
              ${this.state.title.error && 'has-error'}`
            }
            type="text"
            name="title"
            placeholder="Enter todo title"
            value={this.state.title.value}
            onChange={this.handleUserInput}
          />
          {this.state.title.error && (
            <span className="error">
              {this.state.title.error}
            </span>
          )}
        </div>
        <div className="input-field">
          <select
            className={
              `input-field--select 
              ${this.state.userId.error && 'has-error'}`
            }
            name="userId"
            onChange={this.handleUserInput}
          >
            <option>Assign to</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
          {this.state.userId.error && (
            <span className="error">
              {'You must select a user'}
            </span>
          )}
        </div>
        <button className="submitButton" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default NewTodo;
