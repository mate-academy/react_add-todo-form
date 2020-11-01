import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

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

  clickAddTodoButton = () => {
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
      <form className="form">
        {userError
          && (
            <div className="form__error">
              Please choose a user
            </div>
          )
        }

        <select
          className="form__select"
          value={user.name}
          onChange={this.chooseUser}
        >
          <option>
            Choose a user
          </option>
          {users.map(person => (
            <option key={person.id}>
              {person.name}
            </option>
          ))}
        </select>

        {titleError
          && (
            <div className="form__error">
              Please enter the task
            </div>
          )
        }

        <textarea
          className="form__textarea"
          placeholder="Enter your task"
          value={title}
          onChange={this.addTitle}
        />

        <button
          type="button"
          className="form__button"
          onClick={this.clickAddTodoButton}
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
