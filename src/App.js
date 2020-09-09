import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(elem => ({
  ...elem,
  user: users.find(user => user.id === elem.userId),
}));

class App extends React.Component {
  state = {
    todos: [
      ...preparedTodos,
    ],
    title: '',
    id: '',
    hasTitleError: false,
    hasUserError: false,
  }

  handleChange = (event) => {
    const {
      name, value,
    } = event.target;

    this.setState({
      [name]: value,
      hasTitleError: false,
      hasUserError: false,
    });
  }

  makeTodo = () => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          title: state.title,
          user: users.find(user => user.name === state.id),
        },
      ],
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { title, id } = this.state;

    if (!title) {
      this.setState({
        hasTitleError: !title,
      });

      return;
    }

    if (!id) {
      this.setState({
        hasUserError: !id,
      });

      return;
    }

    this.makeTodo();
    this.setState({
      title: '',
      id: '',
    });
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h1>Static list of todos</h1>

        <p hidden={!this.state.hasTitleError}>Please enter a todo</p>
        <input
          type="text"
          name="title"
          placeholder="Enter a todo"
          value={this.state.title}
          onChange={this.handleChange}
        />

        <p hidden={!this.state.hasUserError}>Please choose a user</p>
        <select
          name="id"
          value={this.state.id}
          onChange={this.handleChange}
        >
          <option value="" selected="true">
            letsGo!
          </option>
          {users.map(
            elem => (
              <option key={elem.id} value={elem.name}>
                {elem.name}
              </option>
            ),
          )
          }
        </select>
        <button type="submit">
          add
        </button>

        <div className="app">
          <TodoList todos={this.state.todos} />

        </div>
      </form>
    );
  }
}

export default App;
