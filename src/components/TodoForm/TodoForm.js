import React from 'react';
import PropTypes from 'prop-types';
import { UserShape } from '../../shapes/UserShape';
import './TodoForm.scss';
import { TitleInput } from './FormComponents/TitleInput';
import { UserSelect } from './FormComponents/UserSelect';
import { ButtonSubmit } from './FormComponents/ButtonSubmit';

export class TodoForm extends React.PureComponent {
  state = {
    title: '',
    userName: '',
    titleError: false,
    userNameError: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userName } = this.state;
    const { addTodo, users } = this.props;
    const titleError = !title.trim();
    const userNameError = !userName;

    if (userNameError || titleError) {
      this.setState({
        titleError,
        userNameError,
      });

      return;
    }

    const selectedUser = users.find(user => user.name === userName);

    addTodo(title, selectedUser);

    this.setState({
      title: '',
      userName: '',
      titleError: false,
      userNameError: false,
    });
  }

  render() {
    const { users } = this.props;
    const { titleError, title, userName, userNameError } = this.state;

    return (
      <form
        onSubmit={this.handleSubmit}
        className="form"
      >
        <TitleInput
          title={title}
          titleError={titleError}
          handleChange={this.handleChange}
        />
        <UserSelect
          userName={userName}
          userNameError={userNameError}
          handleChange={this.handleChange}
          users={users}
        />
        <ButtonSubmit />
      </form>
    );
  }
}

TodoForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape(UserShape).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
