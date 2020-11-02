import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

import { Select } from '../Select/Select';
import { Textarea } from '../Textarea/Textarea';

export class TodoForm extends React.PureComponent {
  state = {
    user: { name: '' },
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

  submit = (event) => {
    event.preventDefault();
    const { addTodo } = this.props;
    const { title, user } = this.state;

    if (user.name === '') {
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
      <form className="form" onSubmit={this.submit}>
        {userError
          && (
            <div className="form__error">
              Please choose a user
            </div>
          )
        }
        <Select
          users={users}
          user={user}
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
          titleError={title}
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
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  addTodo: PropTypes.func.isRequired,
};
