import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class Form extends React.Component {
  state = {
    userState: '',
    todoState: '',
    errors: {
      user: [],
      todo: [],
    },
  }

  selectUser = (event) => {
    this.setState({
      userState: event.target.value,
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { userState, todoState } = this.state;
    const { addTodo, users, todosState } = this.props;

    if (!userState) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          user: [...prevState.errors.user, 'Please choose a user'],
        },
      }));
    }

    if (!todoState) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          todo: [...prevState.errors.todo, 'Please enter the title'],
        },
      }));
    }

    if (userState && todoState) {
      const todo = {
        id: todosState.length + 1,
        title: todoState,
        user: users.find(user => user.name === userState),
      };

      addTodo(todo);
      this.setState({
        userState: '',
        todoState: '',
        errors: {
          user: [],
          todo: [],
        },
      });
    }
  }

  render() {
    const {
      userState,
      todoState,
      errors,
    } = this.state;

    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="userState">Select a user</label>
        <select
          name="userState"
          value={userState}
          onChange={this.handleChange}
        >
          <option value="">Choose a user</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.name}
            >
              {user.name}
            </option>
          ))}
        </select>
        <div className={classNames(
          'error',
          { visible: errors.user[0] },
        )}
        >
          {errors.user[0] ? errors.user[0] : ''}
        </div>

        <label htmlFor="userState">Title of todo</label>
        <input
          name="todoState"
          type="text"
          placeholder="Add todo"
          value={todoState}
          onChange={this.handleChange}
        />
        <div className={classNames(
          'error',
          { visible: errors.todo[0] },
        )}
        >
          {errors.todo[0] ? errors.todo[0] : ''}
        </div>
        <button type="submit">Add</button>
      </form>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(PropTypes.any),
  todosState: PropTypes.arrayOf(PropTypes.any),
  addTodo: PropTypes.func.isRequired,
};

Form.defaultProps = {
  users: [],
  todosState: [],
};
