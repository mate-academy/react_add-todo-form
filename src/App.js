import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    newTodoTitle: '',
    newUserId: 0,
    hasTitleError: false,
    hasUserError: false,
    prevId: Math.max(...preparedTodos.map(todo => todo.id))
  }

  addTodo(todoTitle, userId) {
    const newTodo = {
      userId: userId,
      id: this.state.prevId + 1,
      title: todoTitle,
      completed: false,
      user: users.find(user => user.id === userId)
    }
  
    this.setState({
      todos: [...this.state.todos, newTodo ]
    });

    console.log(newTodo);
  };

  handleTitleChange = (event) => {
    this.setState({
      newTodoTitle: event.target.value,
      hasTitleError: false
    })
  };

  handleUserChange = (event) => {
    this.setState({
      newUserId: +event.target.value,
      hasUserError: false
    })
  };

  handleFormSubmit = event => {
    event.preventDefault();
    const { newTodoTitle, newUserId } = this.state;

    if (!newTodoTitle && !newUserId) {
      this.setState({
        hasTitleError: !newTodoTitle,
        hasUserError: !newUserId
      })
    }

    if (!newTodoTitle || !newTodoTitle.trim().length) {
      this.setState({
        hasTitleError: !newTodoTitle
      });
      return;
    }

    if (!newUserId) {
      this.setState({
        hasUserError: !newUserId
      });
      return;
    }

    this.addTodo(newTodoTitle, newUserId);
    this.setState({
      newTodoTitle: '',
      newUserId: 0,
      prevId: this.state.prevId + 1,
      hasTitleError: false,
      hasUserError: false
    });
  }

  render() {
    const { 
      todos,
      newTodoTitle,
      newUserId,
      hasTitleError,
      hasUserError
    } = this.state;

    return (
      <div className="App">
        <h1 className="app-title">Static list of todos</h1>
        <form
          onSubmit={this.handleFormSubmit}
        >  
          <div className="newTitle">
            <input
            type="text"
            placeholder="Enter the title"
            value={newTodoTitle}
            onChange={this.handleTitleChange}
            >
            </input>

            {hasTitleError && (
              <span className="error">Please enter the title</span>
            )}
          </div>

          <div className="newUser">
            <select
              value={newUserId}
              onChange={this.handleUserChange}
            >
              <option
                value="0"
              >
                Choose a user
              </option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>

            {hasUserError && (
              <span className="error">Please choose a user</span>
            )}
          </div>

          <button
            className="addButton"
            type="submit"
          >
            Add
          </button>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
