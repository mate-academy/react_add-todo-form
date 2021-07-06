import React from 'react';
import PropTypes from 'prop-types';
import users from '../../api/users';
import './NewTodo.css';

export class NewTodo extends React.Component {
  state = {
    userId: 0,
    title: '',
  };

  onChange = (event) => {
    const { name, value } = event.target;

    if (!value || /^\s+$/.test(value)) {
      event.target.setCustomValidity('Please enter a todo title');
    } else {
      event.target.setCustomValidity('');
    }

    this.setState({
      [name]: value,
    });

    if (name === 'userId') {
      this.setState({
        [name]: +value,
      });
    }
  };

  clearForm = () => {
    this.setState({
      userId: 0,
      title: '',
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { addTodo, todos } = this.props;
    const { title, userId } = this.state;

    addTodo({
      id: todos.length + 1,
      title,
      userId,
      user: users.find(person => person.id === +userId),
    });

    this.clearForm();
  }

  render() {
    const { title } = this.state;

    return (
      <form className="NewTodo" onSubmit={this.onSubmit}>
        <label htmlFor="newTodo">
          Todo:
        </label>
        <br />
        <textarea
          className="NewTodo__title"
          name="title"
          id="newTodo"
          rows="5"
          cols="50"
          placeholder="Enter Todo"
          value={title}
          onChange={this.onChange}
          required
        />
        <br />
        <select
          className="NewTodo__select"
          name="userId"
          onChange={this.onChange}
          required
        >
          <option value="" hidden>Select User</option>
          {users.map(({ id, name }) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
        <br />
        <button className="NewTodo__btn" type="submit">
          Add
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
};
