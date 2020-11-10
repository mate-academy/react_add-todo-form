import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../forminput/FormInput';
import FormSelect from '../formselect/FormSelect';

import { UserShape } from '../shapes/UserShape';

export class TodoForm extends React.PureComponent {
  state = {
    title: '',
    userName: '',
    titleError: false,
    userNameError: false,
  }

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userName } = this.state;
    const { addTodo, users } = this.props;

    if (!title.trim()) {
      this.setState({ titleError: true });
    }

    if (userName === 'Choose a user' || !userName) {
      this.setState({ userNameError: true });
    }

    if (title.trim() && userName) {
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
    const {
      title,
      userName,
      titleError,
      userNameError,
    } = this.state;

    return (
      <form
        className="ui form"
        onSubmit={this.handleSubmit}
      >

        <FormInput
          title={title}
          handleChange={this.handleChange}
          titleError={titleError}
        />

        <div className="ui divider" />

        <FormSelect
          userName={userName}
          handleChange={this.handleChange}
          users={users}
          userNameError={userNameError}
        />

        <div className="ui divider" />

        <button
          type="submit"
          className="ui button"
          onClick={this.handleSubmit}
        >
          Add
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(UserShape).isRequired,
  addTodo: PropTypes.func.isRequired,
};
