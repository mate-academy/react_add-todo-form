import React from 'react';
import './App.css';
import TodoList from './components/TodoList/TodoList';
import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
state = {
  newTodo: '',
  todos: preparedTodos,
  user: '',
  userError: false,
  titleError: false,
}

handleChange = (event) => {
  this.setState({
    newTodo: event.target.value,
    titleError: false,
  });
}

handleSubmit = (event) => {
  event.preventDefault();

  if (this.state.newTodo.trim().length === 0 && this.state.user.length === 0) {
    this.setState({
      titleError: true,
      userError: true,
    });

    return;
  }

  if (this.state.user.length === 0) {
    this.setState({ userError: true });

    return;
  }

  if (this.state.newTodo.trim().length === 0) {
    this.setState({ titleError: true });

    return;
  }

  this.setState(state => ({ todos: [
    {
      completed: false,
      title: state.newTodo,
      user: users.find(person => person.name === state.user),
      id: state.todos.length + 1,
    },
    ...state.todos,
  ] }
  ));

  this.setState({
    newTodo: '',
    user: '',
  });
}

handleSelect = (event) => {
  this.setState({
    user: event.target.value,
    userError: false,
  });
}

render() {
  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form>
        <label>
          <input
            type="text"
            value={this.state.newTodo}
            placeholder="Add new todo"
            onChange={this.handleChange}
          />
        </label>
        {this.state.titleError
            && (
            <span>
              Please enter the title
            </span>
            )
          }
        {' '}
        <select name="users" onChange={this.handleSelect}>
          <option value="">
            Choose a user
          </option>
          {users.map(person => (
            <option key={person.id}>
              {person.name}
            </option>
          ))}
        </select>
        {this.state.userError
            && (
            <span>
              Please choose a user
            </span>
            )
          }
        {' '}
        <button
          type="submit"
          className="btn"
          onClick={this.handleSubmit}
        >
          Add
        </button>
      </form>
      <TodoList todos={this.state.todos} />
      <p>
        <span>Users: </span>
        {users.length}
      </p>
    </div>
  );
}
}

export default App;
