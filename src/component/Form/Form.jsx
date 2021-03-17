import React from 'react';
import PropTypes from 'prop-types';
import { TodoList } from '../TodoList';
import { Select } from '../Select';

export class Form extends React.Component {
  state = {
    selectedUserId: 0,
    title: '',
    isTitleWritten: false,
    isUserWritten: false,
    todos: this.props.todos,
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
        user: this.props.users.find(user => user.id === selectedUserId),
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
          <Select
            selectUserHandler={this.selectUserHandler}
            selectedUserId={selectedUserId}
            users={this.props.users}
          />
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
