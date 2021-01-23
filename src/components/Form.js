import React from 'react';
import PropTypes from 'prop-types';

import { UserShape } from '../shapes/UserShape';
import { Input } from './Input';
import { Select } from './Select';

const initialState = {
  task: '',
  userName: '',
  user: '',
};

export class Form extends React.PureComponent {
  state = {
    inputs: initialState,
    errors: {
      userError: false,
      titleError: false,
    },
  };

  callUserError = () => {
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        userError: true,
      },
    }));
  }

  callTitleError = () => {
    this.setState(prevState => ({
      errors: {
        ...prevState.errors,
        titleError: true,
      },
    }));
  }

  handleSubmit = (event) => {
    const { inputs } = this.state;

    event.preventDefault();
    if (!inputs.task) {
      this.callTitleError();
    }

    if (!inputs.userName || inputs.userName === 'Choose a user') {
      this.callUserError();
    }

    if (inputs.task && inputs.userName && inputs.userName !== 'Choose a user') {
      this.props.addTodo(inputs.user, inputs.task);
      this.setState({
        inputs: initialState,
      });
    }
  }

  changeHandler = (event, isTitle, isUser) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [name]: isTitle
          ? value.replace(/[^\w ]/gi, '')
          : value,
        user: isUser
          ? (this.props.users.find(user => (
            user.name === value
          )))
          : prevState.inputs.user,
      },
      errors: {
        ...prevState.errors,
        [isTitle ? 'titleError' : 'userError']: false,
      },
    }));
  }

  handleInputChange = (event) => {
    this.changeHandler(event, true, false);
  }

  handleSelectChange = (event) => {
    this.changeHandler(event, false, true);
  }

  render() {
    const { users } = this.props;
    const { inputs, errors } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}

        className="form"
      >
        <Input
          task={inputs.task}
          onChange={this.handleInputChange}
          titleError={errors.titleError}
        />

        <Select
          userName={inputs.userName}
          onChange={this.handleSelectChange}
          users={users}
          userError={errors.userError}
        />

        <button type="submit" className="btn btn-dark">
          Add
        </button>

      </form>
    );
  }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(UserShape).isRequired,
};
