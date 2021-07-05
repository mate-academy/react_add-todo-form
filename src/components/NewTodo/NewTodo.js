
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { TodoInput } from '../TodoInput/TodoInput';
import { TodoSelect } from '../TodoSelect/TodoSelect';

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
    if (value.length <= 35 && (/\w|\s/.test(value) || value === '')) {
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
        <div>
          <TodoInput
            handleOnChange={this.setValue}
            title={this.state.title}
          />
        </div>
        <div>
          <div>
            <TodoSelect
              users={this.props.users}
              handleSelect={this.setValue}
              user={this.state.user}
            />
          </div>
          <div>
            <button type="submit">Add</button>
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
