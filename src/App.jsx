import React from 'react';
import './App.css';

import { TodoList } from './components/TodoList';
import users from './api/users';
import todosForUser from './api/todos';

const getUserById = userId => users.find(user => user.id === userId);

const preparedTodos = todosForUser.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    newTitle: '',
    userForTodo: 0,
    hasTodoError: false,
    hasUserError: false,
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { newTitle, userForTodo } = this.state;

    this.setState({
      hasTodoError: !newTitle,
      hasUserError: !userForTodo,
    });

    if (!newTitle) {
      return;
    }

    if (!userForTodo) {
      return;
    }

    this.addTodo(newTitle, userForTodo);
    this.setState({
      newTitle: '',
      userForTodo: 0,
    });
  }

  handleTodoChange = (event) => {
    this.setState({
      newTitle: event.target.value,
    });
  }

  handleUserChange = (event) => {
    this.setState({
      userForTodo: +event.target.value,
    });
  }

  addTodo(todo, userId) {
    const newTitle = {
      id: +new Date(),
      title: todo,
      completed: false,
      user: getUserById(userId),
    };

    this.setState(state => ({
      todos: [...state.todos, newTitle],
    }));
  }

  render() {
    const {
      todos,
      newTitle,
      userForTodo,
      hasTodoError,
      hasUserError,
    } = this.state;

    return (
      <div className="App">

        <form onSubmit={this.handleFormSubmit}>
          <div className="inpTodo">
            <input
              type="text"
              value={newTitle}
              onChange={this.handleTodoChange}
            />
            {hasTodoError && (
              <span className="error">Please enter todo</span>
            )}
          </div>
          <div className="selectUser">
            <select
              value={userForTodo}
              onChange={this.handleUserChange}
            >
              <option>Please select users</option>
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
              <span className="error">Please select user</span>
            )}
          </div>
          <button type="submit">Add</button>
        </form>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
