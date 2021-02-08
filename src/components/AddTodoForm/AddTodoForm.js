import React from 'react';
import './AddTodoForm.css';
import PropTypes from 'prop-types';

export class AddTodoForm extends React.Component {
  state = {
    todo: '',
    userId: 0,
    errTodo: false,
    errUserId: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      errTodo: false,
      errUserId: false,
    });
  };

  handleSubmit = () => {
    const { todo, userId } = this.state;
    const { newTodoId, addTodo } = this.props;

    if (!todo || !userId) {
      this.setState({
        errTodo: !todo,
        errUserId: !userId,
      });

      return;
    }

    const newTodo = {
      userId: +userId,
      id: newTodoId,
      title: todo,
      completed: false,
    };

    addTodo(newTodo);

    this.setState({
      todo: '',
      userId: 0,
      errTodo: false,
      errUserId: false,
    });
  };

  render() {
    const { todo, userId, errTodo, errUserId } = this.state;
    const { users } = this.props;

    return (
      <div className="form">
        <label htmlFor="todo" className="label">
          Todo:
        </label>

        <input
          value={todo}
          name="todo"
          onChange={this.handleChange}
          type="text"
          id="todo"
          className="input"
          placeholder="Enter todo"
        />

        {errTodo && <span className="error">enter task</span>}

        <label htmlFor="user" className="label">
          User:
        </label>

        <select
          name="userId"
          value={userId}
          onChange={this.handleChange}
          className="input"
        >
          <option value="">
            Select a user...
          </option>
          {users.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>

        {errUserId && <span className="error">select user</span>}

        <button
          type="button"
          className="input"
          onClick={this.handleSubmit}
        >
          Add Todo
        </button>
      </div>
    );
  }
}

AddTodoForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ).isRequired,
  newTodoId: PropTypes.number.isRequired,
  addTodo: PropTypes.func.isRequired,
};
