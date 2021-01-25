import React from 'react';
import './Form.css';
import PropTypes from 'prop-types';
import { Select } from './Select';
import { Input } from './Input';
import { UsersShape } from '../shapes/UsersShape';

export class Form extends React.Component {
  state = {
    user: '',
    title: '',
  }

  onChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value.trim(),
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { user, title } = this.state;
    const { users } = this.props;

    if (user.length === 0) {
      this.setState({
        userMessage: 'Please choose a user',
      });

      return;
    }

    if (title.length === 0) {
      this.setState({
        titleMessage: 'Please enter the title',
      });

      return;
    }

    this.props.addTodo(users.find(person => person.name === user), title);

    this.setState({
      user: '',
      title: '',
      titleMessage: '',
      userMessage: '',
    });
  }

  render() {
    const { user, title, userMessage, titleMessage } = this.state;
    const { users } = this.props;

    return (
      <form
        name="usersTodos"
        className="form"
        onSubmit={this.onSubmit}
      >
        <Select
          user={user}
          onChange={this.onChange}
          users={users}
          userMessage={userMessage}
        />
        <Input
          title={title}
          titleMessage={titleMessage}
          onChange={this.onChange}
        />
        <button
          type="submit"
          className="button"
        >
          Add
        </button>
      </form>
    );
  }
}
Form.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(UsersShape)).isRequired,
  addTodo: PropTypes.func.isRequired,
};
