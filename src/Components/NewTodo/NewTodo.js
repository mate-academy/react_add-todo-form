/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TodoList } from '../TodoList/TodoList';
import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    todos: this.props.todos.map(todo => ({
      ...todo,
      user: this.props.users.find(user => user.id === todo.userId),
    })),
    selectedUser: 0,
    newTodo: '',
    userId: null,
    isUserSelected: true,
    isTodoInputed: true,
  };

  handleSelect = (event) => {
    this.setState({
      selectedUser: event.target.value,
      userId: this.props.users.find(user => (
        user.name === event.target.value)).id,
      isUserSelected: true,
    });
  }

  handleAddInput = (event) => {
    event.preventDefault();
    this.setState({
      newTodo: event.target.value,
      isTodoInputed: true,
    });
  }

  handleSubmit = (event) => {
    const { selectedUser, newTodo } = this.state;

    event.preventDefault();

    if (selectedUser === 0) {
      this.setState(state => ({ isUserSelected: !state.isUserSelected }));
    }

    if (newTodo === '') {
      this.setState(state => ({ isTodoInputed: !state.isTodoInputed }));
    }

    if (selectedUser && newTodo) {
      this.setState(state => ({
        todos: [{
          userId: state.userId,
          id: state.todos.length + 1,
          title: state.newTodo,
          completed: false,
          user: this.props.users.find(user => user.id === state.userId),
        },
        ...state.todos],
        selectedUser: 0,
        newTodo: '',
        userId: null,
        isUserSelected: true,
        isTodoInputed: true,
      }));
    }
  }

  handleComplition = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  };

  render() {
    const { todos,
      newTodo,
      selectedUser,
      isUserSelected,
      isTodoInputed } = this.state;

    const { users } = this.props;

    const seletedUserClassname = classNames('todo__choose-user', {
      unchosen: !isUserSelected,
    });

    const seletedTodoClassname = classNames('todo__add-todo', {
      unchosen: !isTodoInputed,
    });

    return (
      <>
        <div className="todo__add">
          <form className="todo__form" onSubmit={this.handleSubmit}>

            <div className="todo__select">
              <select value={selectedUser} onChange={this.handleSelect}>
                <option value="0" disabled>choose user</option>

                {users.map(({ id, name }) => (
                  <option key={id} value={name}>{name}</option>
                ))}
              </select>

              <span className={seletedUserClassname}>
                please choose user
              </span>
            </div>

            <div className="todo__text-input">
              <input
                type="text"
                placeholder="add your new todo!"
                value={newTodo.trim()}
                onChange={this.handleAddInput}
              />
              <span className={seletedTodoClassname}>
                please add todo
              </span>
            </div>

            <div className="todo__button">
              <button type="submit">
                <span>+</span>
              </button>
            </div>

          </form>
        </div>

        <p>
          <span>Todos: {todos.length}</span>
        </p>

        <TodoList
          todos={todos}
          setStatus={this.handleComplition}
        />
      </>
    );
  }
}

NewTodo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default NewTodo;
