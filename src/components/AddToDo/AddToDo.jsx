import React from 'react';
import PropTypes from 'prop-types';
import { UserPropTypes } from '../PropTypes/UserPropTypes';
import './AddToDo.css';
import InputDescription from './Input/InputDescription';
import SelectName from './Input/SelectName';

export class AddToDo extends React.PureComponent {
  state = {
    title: '',
    userName: '',
    titleError: false,
    userNameError: false,
  }

  handleChange = (event) => {
    const { name, value, type } = event.target;

    this.setState({
      [name]: type === 'text'
        ? value.replace(/[^\w ]+/, '')
        : value,
      [`${name}Error`]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, userName } = this.state;
    const { addToDo, users } = this.props;
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

    addToDo(title, selectedUser);

    this.setState({
      title: '',
      userName: '',
      titleError: false,
      userNameError: false,
    });
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
        onSubmit={this.handleSubmit}
        className="ui form inverted green segment"
      >
        <p className="title">Enter title:</p>

        <InputDescription
          title={title}
          handleChange={this.handleChange}
          titleError={titleError}
        />

        <SelectName
          userName={userName}
          handleChange={this.handleChange}
          users={users}
          userNameError={userNameError}
        />

        <button
          type="submit"
          className="ui button blue"
        >
          Add todo!
        </button>
      </form>
    );
  }
}

AddToDo.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape(UserPropTypes).isRequired,
  ).isRequired,
  addToDo: PropTypes.func.isRequired,
};
