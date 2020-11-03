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

  handleInputChange = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [targetName]: targetValue.replace(/[^\w ]/gi, ''),
      },
      errors: {
        ...prevState.errors,
        titleError: false,
      },
    }));
  }

  handleSelectChange = (event) => {
    const targetName = event.target.name;
    const targetValue = event.target.value;

    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        [targetName]: targetValue,
      },
      errors: {
        ...prevState.errors,
        userError: false,
      },
    }));
    this.setState(prevState => ({
      inputs: {
        ...prevState.inputs,
        user: this.props.users.find(user => (
          user.name === prevState.inputs.userName
        )),
      },
    }));
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
