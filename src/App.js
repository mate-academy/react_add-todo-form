import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';
import Todolist from './components/TodoList';

const newTodos = [...todos];

export class App extends React.Component {
  state = {
    title: '',
    name: '',
    completed: false,
    preparedTodos: newTodos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    })),
    inputAlert: '',
  }

  handleAdd = (event) => {
    const { name, value, type, checked } = event.target;

    this.setState({
      [name]: type === 'checkbox' ? checked : value,
      inputAlert: '',
      selectAlert: '',
    });
  }

  submit=(event) => {
    event.preventDefault();
    if (!this.state.title) {
      this.setState({ inputAlert: 'Please enter the title' });

      return;
    }

    if (!this.state.name) {
      this.setState({ selectAlert: 'Please choose a user' });

      return;
    }

    const newTodo = {
      userId: users.find(user => user.name === this.state.name).id,
      id: newTodos.length + 1,
      title: this.state.title,
      completed: this.state.completed,
      user: users.find(user => user.name === this.state.name),
    };

    this.setState(state => ({
      title: '',
      name: '',
      completed: false,
      preparedTodos: [...state.preparedTodos, newTodo],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <div>
          <form onSubmit={this.submit}>
            <label htmlFor="title">enter a todo title</label>
            <input
              id="title"
              name="title"
              placeholder="enter a todo title"
              value={this.state.title}
              onChange={this.handleAdd}
            />
            <span>{this.state.inputAlert}</span>
            <br />
            <label htmlFor="userSelect">Choose a user</label>
            <select
              id="userSelect"
              name="name"
              value={this.state.name}
              onChange={this.handleAdd}
            >
              <option value="">Choose a user</option>
              {users.map(user => (
                <option
                  name="name"
                  value={user.name}
                >
                  {' '}
                  {user.name}
                </option>
              ))}
            </select>
            <span>{this.state.selectAlert}</span>
            <br />
            <label htmlFor="isReady">completed</label>
            <input
              id="isReady"
              type="checkbox"
              name="completed"
              checked={this.state.completed}
              onChange={this.handleAdd}
            />
            <br />
            <button
              type="submit"
              onSubmit={this.submit}
            >
              add
            </button>
          </form>
        </div>
        <p>
          <span>todos: </span>
          <Todolist todos={this.state.preparedTodos} />
        </p>
      </div>
    );
  }
}

export default App;
