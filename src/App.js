import React from 'react';
import TodoList from './components/TodoList/TodoList';
import './App.css';

import users from './api/users';
import todoList from './api/todos';

class App extends React.Component {
  state = {
    todos: todoList,
    select: '',
    input: '',
    errorTodo: false,
    errorUser: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  formSubmit = (event) => {
    event.preventDefault();

    if (this.state.input === '') {
      this.setState({ errorTodo: true });

      return;
    }

    if (this.state.select === '') {
      this.setState({ errorUser: true });

      return;
    }

    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          userId: users.find(user => user.name === prevState.select).id,
          id: prevState.length + 1,
          title: prevState.input,
          completed: false,
        },
      ],
    }));

    this.setState({
      select: '',
      input: '',
      errorTodo: false,
      errorUser: false,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form className="form" onSubmit={this.formSubmit}>
          <input
            className="label"
            type="text"
            name="input"
            onChange={this.handleChange}
            value={this.state.input}
            placeholder="Add a new TODO"
          />
          {this.state.errorTodo && (
            <span className="error">Please enter the Todo</span>
          )}
          <select
            value={this.state.select}
            onChange={this.handleChange}
            name="select"
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          {this.state.errorUser && (
            <span className="error">Please choose a User</span>
          )}
          <button type="submit">Add</button>
        </form>

        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
