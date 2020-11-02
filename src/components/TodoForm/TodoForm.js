import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

import { Select } from '../Select/Select';
import { Textarea } from '../Textarea/Textarea';
import { UserShape } from '../shapes/UserShape';

export class TodoForm extends React.PureComponent {
  state = {
    user: '',
    title: '',
    userError: false,
    titleError: false,
  }

  chooseUser = (event) => {
    const { value } = event.target;
    const { users } = this.props;

    this.setState({
      user: users.find(user => user.name === value),
      userError: false,
    });
  }

  addTitle = (event) => {
    const { value } = event.target;

    this.setState({
      title: value,
      titleError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { addTodo } = this.props;
    const { title, user } = this.state;

    if (!user.name) {
      this.setState({
        userError: true,
      });

      return;
    }

    if (!title.length) {
      this.setState({
        titleError: true,
      });

      return;
    }

    this.setState({
      user: { name: '' },
      title: '',
    });

    addTodo(title, user);
  }

  render() {
    const { users } = this.props;
    const { title, user, userError, titleError } = this.state;

    return (
      <form
        className="form"
        onSubmit={this.handleSubmit}
      >
        {userError
          && (
            <div className="form__error">
              Please choose a user
            </div>
          )
        }
        <Select
          users={users}
          value={user.name}
          chooseUser={this.chooseUser}
        />

        {titleError
          && (
            <div className="form__error">
              Please enter the task
            </div>
          )
        }
        <Textarea
          value={title}
          addTitle={this.addTitle}
        />

        <button
          type="submit"
          className="form__button"
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
