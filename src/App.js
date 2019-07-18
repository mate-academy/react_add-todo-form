import React from 'react';
import './App.css';
import PropTypes from 'prop-types';

import todos from './api/todos';
import users from './api/users';
import TodoList from './TodoList';

class App extends React.Component {
    state = { todos };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          userName: todo.userName,
          title: todo.title,
          id: prevState.todos.length + 1,
          completed: false,
        },
      ],
    }));
  }

  render() {
    // const { todos } = this.state;

    return (
      <div className="App">
        <NewTodo
          users={users}
          onSubmit={this.addTodo}
        />
        <h1>Static list of todos</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

class NewTodo extends React.Component {
  state = {
    todo: {
      title: '',
    },
  }

  handleFieldChange = (event) => {
    const { name, value } = event.target;

    this.setState(prevState => ({
      todo: {
        ...prevState.todo,
        [name]: value,
      },
    }));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { todo } = this.state;
    const { onSubmit } = this.props;

    onSubmit(todo);
    this.setState(prevState => ({
      todo: {
        ...prevState.todo,
        userName: '',
        title: '',
      },
    }));
  }

  render() {
    const { todo } = this.state;

    return (
      <fieldset>
        <legend>Add TODOs</legend>
        <form
          className="form"
          onSubmit={this.handleFormSubmit}
        >
          <label
            className="new-todo"
            htmlFor="new-todo-title"
          >
            <span>Please, enter a title </span>
            <input
              id="new-todo-title"
              placeholder="Title"
              value={todo.title}
              name="title"
              type="text"
              onChange={this.handleFieldChange}
            />
          </label>
          <button
            className="btn-add"
            type="submit"
          >
            Add
          </button>
        </form>
      </fieldset>
    );
  }
}

NewTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default App;
