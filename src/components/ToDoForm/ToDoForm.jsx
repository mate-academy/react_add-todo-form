import React from 'react';
import PropTypes from 'prop-types';

export class TodoForm extends React.Component {
  state = {
    values: {
      todoName: '',
      userId: '',
    },
    errors: {
      todoName: false,
      userId: false,
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

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { todoName, userId } = this.state.values;

    if (!todoName || !userId) {
      this.setState(state => ({
        errors: {
          ...state.errors,
          todoName: !state.values.todoName,
          userId: !state.values.userId,
        },
      }));

      return;
    }

    this.setState({
      values: {
        todoName: '',
        userId: '',
      },
      errors: {
        todoName: false,
        userId: false,
      },
    });

    this.props.onAdd(todoName, userId);
  };

  render() {
    const { values, errors } = this.state;
    const { users } = this.props;

    return (
      <form onSubmit={this.handleFormSubmit}>
        <div>
          <input
            type="text"
            name="todoName"
            value={values.todoName}
            onChange={this.handleChange}
            placeholder="Add todo"
          />
          {errors.todoName && (
            <span className="error">
              Please add todo
            </span>
          )}
        </div>
        <div>
          <select
            value={values.userId}
            name="userId"
            onChange={this.handleChange}
          >
            <option>Please select user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.userId && (
          <span className="error">
            Please select user
          </span>
          )}
        </div>
        <br />
        <button type="submit">Add</button>
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
