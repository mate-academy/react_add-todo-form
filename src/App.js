import React from 'react';
import { TodoList } from './TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    todo: '',
    user: 'Choose a user',
    todoError: false,
    userError: false,
  }

  // eslint-disable-next-line
  handlerSubmit = (event) => {
    event.preventDefault();
    if (this.state.todo !== '' && this.state.user !== 'Choose a user') {
      this.setState(prev => ({
        todos: [
          ...prev.todos,
          {
            userId: users.find(
              user => user.name === prev.user,
            ).id,
            id: prev.todos.length + 1,
            title: prev.todo,
            user: users.find(user => user.name === prev.user),
          },
        ],
        user: 'Choose a user',
        todo: '',
      }));
    }

    if (this.state.todo === '' || this.state.user === 'Choose a user') {
      return this.setState(state => ({
        todoError: !state.todo,
        userError: state.user === 'Choose a user',
      }));
    }
  }

  handlerChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
      [`${name}Error`]: false,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={this.handlerSubmit} className="form">
          <input
            type="text"
            placeholder="todo"
            name="todo"
            value={this.state.todo}
            onChange={this.handlerChange}
          />

          {this.state.todoError && (
            <span className="errorTitle">Please enter the title</span>
          )}

          <select
            name="user"
            value={this.state.user}
            onChange={this.handlerChange}
          >
            <option disabled>Choose a user</option>
            {users.map(
              user => <option key={user.id}>{user.name}</option>,
            )}
          </select>

          {this.state.userError && (
            <span className="errorUser">Please choose a user</span>
          )}

          <button type="submit">Add</button>
        </form>

        <TodoList users={users} todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
