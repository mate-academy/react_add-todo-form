import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';

class App extends React.Component {
  state = {
    user: '',
    title: '',
    preparedTodos: [],
  }

  componentDidMount() {
    const data = todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    this.setState({ preparedTodos: data });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { user, title, preparedTodos } = this.state;
    const userId = Number(user.split('*').shift());

    const newTodo = {
      userId,
      id: preparedTodos.length + 1,
      title,
      completed: false,
      user: users.find(person => person.id === userId),
    };

    this.setState({ preparedTodos: [
      newTodo,
      ...preparedTodos,
    ] });

    this.setState({
      user: '',
      title: '',
    });
  }

  render() {
    const { user, title, preparedTodos } = this.state;

    return (
      <div className="App">
        <h1>Add a new task</h1>
        <form
          onSubmit={this.handleSubmit}
          className="form"
        >
          <select
            name="user"
            value={user}
            onChange={this.handleChange}
          >
            <option value="">
              Select user
            </option>
            {users.map(({ id, name }) => (
              <option key={id} value={`${id}*${name}`}>{name}</option>
            ))}
          </select>
          <p hidden>Please choose a user</p>
          <label htmlFor="title">Input todo title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <p hidden>Please enter the title</p>
          <button type="submit">Create a task</button>
        </form>

        <TodoList list={preparedTodos} />
      </div>
    );
  }
}

export default App;
