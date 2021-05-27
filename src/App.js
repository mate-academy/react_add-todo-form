import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import TodoList from './TodoList';

const findUser = userId => users.find(user => user.id === userId);

const todosList = todos.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: todosList,
    newTitle: '',
    newUserId: 0,
    titleError: false,
    userError: false,
  }

  submitCheck = (event) => {
    event.preventDefault();
    const { newTitle, newUserId } = this.state;

    this.setState({
      titleError: !newTitle,
      userError: !newUserId,
    });

    if (!newTitle) {
      return;
    }

    if (!newUserId) {
      return;
    }

    this.addTodo(newTitle, +newUserId);

    this.setState({
      newTitle: '',
      newUserId: 0,
    });
  }

  addTodo = (title, userId) => {
    const newTodo = {
      id: this.state.todos.length + 1,
      title,
      userId,
      completed: false,
      user: findUser(userId),
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  render() {
    const {
      newTitle,
      newUserId,
      titleError,
      userError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form
          onSubmit={this.submitCheck}
        >
          <div>
            <input
              type="text"
              placeholder="title"
              value={newTitle}
              onChange={(event) => {
                this.setState({
                  newTitle: event.target.value, titleError: false,
                });
              }}
            />
            {titleError && (
              <span className="error">Please enter the title</span>
            )}
          </div>

          <div>
            <select
              value={newUserId}
              onChange={(event) => {
                this.setState({
                  newUserId: event.target.value, userError: false,
                });
              }}
            >
              <option value="">
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
            {userError && (
              <span className="error">Please enter the title</span>
            )}
          </div>
          <button
            type="submit"
          >
            Add
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
