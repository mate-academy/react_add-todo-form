import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.scss';
import { SelectCreator } from '../SelectCreator/SelectCreator';
import { FormInput } from '../FormInput/FormInput';
import { UserShape } from '../../shapes/UserShape';

export class TodoForm extends React.PureComponent {
  state = {
    title: '',
    userName: '',
    titleError: false,
    userNameError: false,
  }

  valueFormatting = value => value.replace(/[^\w ]+/, '')

  handleChange = (event) => {
    const { name, value, type } = event.target;

    this.setState({
      [name]: type === 'text'
        ? this.valueFormatting(value)
        : value,
      [`${name}Error`]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userName } = this.state;
    const { addTodo, users } = this.props;

    if (!title) {
      this.setState({ titleError: true });
    }

    if (userName === 'Choose a user' || !userName) {
      this.setState({ userNameError: true });
    }

    if (title && userName) {
      const newUser = users.find(user => user.name === userName);

      this.setState({
        title: '',
        userName: '',
      });
      addTodo(title, newUser);
    }
  }

  render() {
    const { users } = this.props;
    const { title, userName, titleError, userNameError } = this.state;

    return (
      <form className="TodoForm" onSubmit={this.handleSubmit}>

        <FormInput
          handleChange={this.handleChange}
          titleError={titleError}
          title={title}
        />

        <SelectCreator
          handleChange={this.handleChange}
          users={users}
          userName={userName}
          userNameError={userNameError}
        />

        <button
          type="submit"
          className="TodoForm__submit"
        >
          Add task
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(UserShape).isRequired,
  addTodo: PropTypes.func.isRequired,
};
