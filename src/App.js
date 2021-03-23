import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    user: '',
    userID: '',
    title: '',
    todos: preparedTodos,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.setState(prevState => ({
      todos: [...prevState.todos, {
        user: prevState.user,
        userID: prevState.user.id,
        id: prevState.todos.length + 1,
        title: prevState.title,
        completed: false,
      }],
    }));
  }

  handleSelection = (event) => {
    const userId = event.target.value;

    this.setState(
      {
        user: users.find(user => user.id === +userId),
        userID: userId,
      },
    );
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Add title"
            value={this.state.title}
            onChange={this.handleChange}
          />

          <select
            name="user"
            value={this.state.userID}
            onChange={this.handleSelection}
          >
            <option>Select user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <button type="submit">Add</button>
        </form>

        <ul>
          {this.state.todos.map(todo => (
            <li key={todo.id}>
              <div>
                {`User: ${todo.user.name}`}
              </div>
              <div>
                {`Title: ${todo.title}`}
              </div>
              <div>
                {`Completed: ${todo.completed ? 'true' : 'false'}`}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
