import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.css';

export class TodoForm extends React.Component {
  state = {
    values: {
      todoName: '',
      todoUserId: '',
    },
    errors: {
      todoName: false,
      todoUserId: false,
    },
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState(state => ({
      values: {
        ...state.values,
        [name]: value,
      },
      errors: {
        ...state.errors,
        [name]: false,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { todoName, todoUserId } = this.state.values;

    if (!todoName || !todoUserId) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          todoName: !state.values.todoName,
          todoUserId: !state.values.todoUserId,
        },
      }));

      return;
    }

    this.setState({
      values: {
        todoName: '',
        todoUserId: '',
      },
      errors: {
        todoName: false,
        todoUserId: false,
      },
    });

    this.props.onAdd(todoName, todoUserId);
  };

  render() {
    const { values, errors } = this.state;
    const { users } = this.props;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="todoName"
          value={values.todoName}
          onChange={this.handleChange}
          placeholder="Write task here"
        />
        {errors.todoName && (
          <span className="todo__error">
            Please enter a name
          </span>
        )}
        <br />
        <select
          name="todoUserId"
          value={values.todoUserId}
          onChange={this.handleChange}
        >
          <option>Please choose a user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {errors.todoUserId && (
          <span className="todo__error">
            Please select a user
          </span>
        )}
        <br />
        <button className="btn-add" type="submit">Add</button>
      </form>
    );
  }
}

const UserType = {
  name: PropTypes.string.isRequired,
};

TodoForm.propTypes = {
  users: PropTypes.arrayOf(UserType).isRequired,
  onAdd: PropTypes.func.isRequired,
};
