import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NewTodoSelect } from '../NewTodoSelect';
import { NewTodoInput } from '../NewTodoInput';

const initState = {
  user: {
    value: '',
    isValid: true,
  },
  title: {
    value: '',
    isValid: true,
  },
};

export class NewTodo extends Component {
  constructor(props) {
    super(props);

    this.state = { ...initState };
  }

  setValue = (key, value) => {
    if (value.length <= 35 && /\w|\s/.test(value)) {
      this.setState(prevState => ({
        [key]: {
          value,
          isValid: !prevState[key].isValid ? Boolean(value) : true,
        },
      }));
    }
  };

  reset = () => {
    this.setState({ ...initState });
  }

  checkValidation = () => ({
    user: this.props.users
      .some(user => user.name === this.state.user.value),
    title: Boolean(this.state.title.value),
  })

  setInvalid = (key) => {
    this.setState(prevState => ({
      [key]: {
        ...prevState[key],
        isValid: false,
      },
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const isValid = this.checkValidation();

    if (!isValid.title) {
      return this.setInvalid('title');
    }

    if (!isValid.user) {
      return this.setInvalid('user');
    }

    this.reset();

    return this.props.addTodo(
      this.state.title.value.trim(),
      this.state.user.value,
    );
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group row col">
          <NewTodoInput
            handleOnChange={this.setValue}
            title={this.state.title}
          />
        </div>
        <div className="row col justify-content-between align-items-end">
          <div className="form-group text-left">
            <NewTodoSelect
              users={this.props.users}
              handleSelect={this.setValue}
              user={this.state.user}
            />
          </div>
          <div className="form-group col-4">
            <button
              type="submit"
              className="btn btn-secondary w-100"
            >
              Add
            </button>
          </div>
        </div>
      </form>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
};
