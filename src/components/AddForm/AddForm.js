import React from 'react';
import PropTypes from 'prop-types';
import './AddForm.scss';
import { TodoList } from '../TodoList';

export class AddForm extends React.Component {
  state = {
    user: '',
    newTodo: '',
    errorName: false,
    errorTitle: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { allUsers, allTodos } = this.props;
    const { user, newTodo } = this.state;

    if (!user) {
      this.setState({ errorName: true });
    } else {
      this.setState({ errorName: false });
    }

    if (!newTodo) {
      this.setState({ errorTitle: true });
    } else {
      this.setState({ errorTitle: false });
    }

    if (!user || !newTodo) {
      return;
    }

    allTodos.push({
      userId: allUsers
        .find(person => this.state.user === person.name)
        .id,
      id: allTodos.length + 1,
      title: this.state.newTodo,
      completed: false,
    });

    this.setState({
      user: '',
      newTodo: '',
    });
  }

  render() {
    const { user, newTodo, errorName, errorTitle } = this.state;

    return (
      <>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <select
            name="user"
            className="form__selection"
            value={user}
            onChange={this.handleChange}
          >
            <option value="">Choose user name</option>
            {this.props.allUsers.map(person => (
              <option key={person.id} value={person.name}>
                {person.name}
              </option>
            ))}
          </select>

          {errorName && (
            <span className="form__error">
              Please choose a user
            </span>
          )}

          <input
            type="text"
            className="form__input"
            name="newTodo"
            value={newTodo}
            placeholder="Input new todo here"
            onChange={this.handleChange}
          />

          {errorTitle && (
            <span className="form__error">
              Please enter the title
            </span>
          )}

          <button
            type="submit"
            className="form__button"
          >
            Add
          </button>
        </form>
        <TodoList todosPrep={this.props.allTodos} />
      </>
    );
  }
}

AddForm.propTypes = {
  allUsers: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
  allTodos: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
    }),
  ).isRequired,
};
