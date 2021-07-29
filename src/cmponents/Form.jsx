import React from 'react';
import PropTypes from 'prop-types';
import users from '../api/users';

export class Form extends React.Component {
  state = {
    selectValidation: true,
    inputValidation: true,
    title: '',
    userId: 0,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, userId } = this.state;

    if (title.length >= 1 && userId >= 1) {
      const todo = {
        userId,
        // eslint-disable-next-line react/prop-types
        id: this.props.todos.length + 1,
        title,
        completed: false,
      };

      this.setState({
        userId: 0,
        title: '',
      });

      this.props.addTodos(todo);
    }
  };

  userSearch = event => (
    event.target.value === ''
      ? this.setState({ userId: 0 })
      : this.setState({
        userId: Number(event.target.value),
        selectValidation: true,
      })
  );

  onChange = (event) => {
    const { name, value } = event.target;

    if (value !== '') {
      this.setState({
        inputValidation: true,
      });
    }

    this.setState({
      [name]: value,
    });
  };

  checkInput = () => {
    if (this.state.title === '') {
      this.setState({
        inputValidation: false,
      });
    }

    if (this.state.userId === 0) {
      this.setState({
        selectValidation: false,
      });
    }
  };

  render() {
    const { title, userId, inputValidation, selectValidation } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={this.onChange}
          placeholder="Title"
        />
        {inputValidation
          || (
          <span>
            is Required
          </span>
          )
        }
        <select
          onChange={this.userSearch}
          value={userId}
          name="select"
        >
          <option value="">Choice User</option>
          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {selectValidation
          || (
          <span>
            is Required
          </span>
          )
        }
        <button type="submit" onClick={this.checkInput}>
          Add Comment
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  addTodos: PropTypes.func.isRequired,
};
