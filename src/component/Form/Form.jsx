import React from 'react';
import { TodoList } from '../TodoList';
import PropTypes from 'prop-types';

export class Form extends React.Component {
  state = {
    selectedUserId: 0,
    title: '',
    isTitleWritten: false,
    isUserWritten: false,
    todos: this.props.todos,
    users: this.props.users,
  }

  changeTitleHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      isTitleWritten: false,
    });
  }

  selectUserHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: +value,
      isUserWritten: false,
    });
  }

  addTodo = (event) => {
    const { title, selectedUserId, isTitleWritten, isUserWritten } = this.state;

    event.preventDefault();

    if (!title || selectedUserId === 0) {
      this.setState({
        isTitleWritten: !isTitleWritten,
        isUserWritten: isUserWritten !== 0,
      });

      return;
    }

    this.setState((state) => {
      const newTodo = {
        id: state.todos.length + 1,
        title,
        completed: false,
        userId: selectedUserId,
        user: this.state.users.find(user => user.id === selectedUserId),
      };

      return ({
        selectedUserId: 0,
        title: '',
        todos: [...state.todos, newTodo],
      });
    });
  };

  render() {
    const {
      selectedUserId,
      title,
      isTitleWritten,
      isUserWritten,
    } = this.state;

    return (
      <>
        <form method="GET">
          <label>
            <input
              type="text"
              name="title"
              placeholder="Please enter the title"
              value={title}
              onChange={this.changeTitleHandler}
            />
          </label>
          <label>
            <select
              name="selectedUserId"
              onChange={this.selectUserHandler}
              value={selectedUserId}
            >
              <option>Choose a user</option>
              {this.props.users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <button
            type="submit"
            onClick={this.addTodo}
          >
            Add
          </button>
        </form>
        <TodoList todos={this.state.todos} />
        {isTitleWritten && (
          <div className="isTitleWritten">Dude, write some title</div>
        )}
        {isUserWritten && (
          <div className="isUserWritten">Mate, u didnt choose user</div>
        )}
      </>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};
