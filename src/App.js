import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './components/TodoList/TodoList';

const findUser = userId => users.find(user => user.id === userId);

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    newTitle: '',
    newUserId: 0,
    titleError: false,
    userError: false,
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

  handleFormSubmit = (event) => {
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

  render() {
    //  eslint-disable-next-line
    const { todos, newTitle, newUserId, titleError, userError } = this.state;

    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <input
              type="text"
              placeholder="title"
              value={newTitle}
              onChange={(event) => {
                this.setState({
                  newTitle: event.target.value,
                  titleError: false,
                });
              }}
            />

            {titleError && (
              <span className="error">Please add a task</span>
            )}
          </div>

          <div>
            <select
              value={newUserId}
              placeholder="Choose a user"
              onChange={(event) => {
                this.setState({
                  newUserId: event.target.value,
                  userError: false,
                });
              }}
            >
              <option value="">Choose a user</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>

            {userError && (
              <span className="error">Please add a user</span>
            )}
          </div>

          <button type="submit">Add</button>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
