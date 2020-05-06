import React from 'react';
import PropTypes from 'prop-types';
import TodoList from './TodoList';
import TodoDone from './TodoDone';

class NewTodo extends React.Component {
  state = {
    users: this.props.users,
    todos: this.props.todos,
    todosDone: [],
    selectedUserId: 0,
    newTodoTitle: '',
    titleHasError: false,
    userNameHasError: false,
  }

  handleTitleChange = (event) => {
    this.setState({
      titleHasError: false,
      newTodoTitle: event.target.value,
    });
  }

  handleUserChange = (event) => {
    this.setState({
      userNameHasError: false,
      selectedUserId: +event.target.value,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { newTodoTitle, selectedUserId } = this.state;

    if (!newTodoTitle || !selectedUserId) {
      this.setState({
        userNameHasError: !selectedUserId,
        titleHasError: !newTodoTitle,
      });

      return;
    }

    this.setState((state) => {
      const newTodo = {
        userId: state.selectedUserId,
        id: state.todos.length + 1,
        title: state.newTodoTitle,
        completed: false,
      };

      return {
        todos: [...state.todos, newTodo],
        selectedUserId: 0,
        newTodoTitle: '',
      };
    });
  }

  handleTodoDone = (id, title) => {
    this.setState((state) => {
      const newTodoDone = {
        userId: id,
        id: state.todosDone.length + 1,
        title,
        completed: true,
      };

      return {
        todos: [...state.todos
          .filter(todo => todo.title !== newTodoDone.title)],
        todosDone: [...state.todosDone, newTodoDone],
      };
    });
  }

  handleDeleteTodo = (title) => {
    this.setState(state => ({
      todos: [...state.todos.filter(todo => todo.title !== title)],
      todosDone: [...state.todosDone.filter(todo => todo.title !== title)],
    }));
  }

  todoInProgress = (id, title) => {
    this.setState((state) => {
      const newTodoInProgress = {
        userId: id,
        id: state.todosDone.length + 1,
        title,
        completed: true,
      };

      return {
        todos: [...state.todos, newTodoInProgress],
        todosDone: [...state.todosDone
          .filter(todo => todo.title !== newTodoInProgress.title)],
      };
    });
  }

  render() {
    const { users,
      selectedUserId,
      newTodoTitle,
      todos,
      titleHasError,
      userNameHasError,
      todosDone } = this.state;

    return (
      <>
        <div className="form__wrapper">
          <h2 className="form__header">Form for creating new todo:</h2>
          <form className="form" onSubmit={this.handleFormSubmit}>
            <fieldset className="form__create-todo">
              <legend className="form__name">Create new todo:</legend>
              <div>
                <label
                  htmlFor="titleOfTodo"
                  className="form__title-text"
                >
                  Write title for new todo:
                </label>
                <input
                  placeholder="Write a title"
                  className="form__title"
                  value={newTodoTitle}
                  id=""
                  onChange={this.handleTitleChange}
                />
                {titleHasError && (
                  <div className="form__error">
                    Please write name of todo...
                  </div>
                )
                }
              </div>
              <div>
                <div className="form__select-title">Select a user:</div>
                <select
                  className="form__select"
                  value={selectedUserId}
                  onChange={this.handleUserChange}
                >
                  <option value="0" hidden>Choose a user:</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                {userNameHasError && (
                  <div className="form__error">
                    Please choose a user name...
                  </div>
                )
                }
              </div>
              <input
                type="submit"
                value="add todo"
                className="form__button button"
              />
            </fieldset>
          </form>
        </div>

        <TodoList
          todos={todos}
          deleteTodo={this.handleDeleteTodo}
          todoDone={this.handleTodoDone}
        />

        <TodoDone
          todosDone={todosDone}
          deleteTodo={this.handleDeleteTodo}
          todoInProgress={this.todoInProgress}
        />

      </>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

export default NewTodo;
