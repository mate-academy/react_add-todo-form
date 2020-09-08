import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    title: '',
    person: '',
    titleError: false,
    personError: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      titleError: false,
      personError: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (!this.state.title) {
      this.setState({ titleError: true });

      return;
    }

    if (!this.state.person) {
      this.setState({ personError: true });

      return;
    }

    this.setState(state => ({
      todos: [
        {
          id: state.todos.length + 1,
          title: state.title,
          completed: false,
          user: usersFromServer.find(user => user.name === state.person),
        },
        ...state.todos,
      ],
    }));

    this.setState({
      person: '',
      title: '',
    });
  }

  render() {
    const {
      todos,
      personError,
      titleError,
      title,
      person,
    } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <p>
          <span>Todos: </span>
          {todos.length}
        </p>

        <form
          className="add-todo"
          onSubmit={this.handleSubmit}
        >
          <label>
            <span className="add-todo__title">Title</span>
            <input
              className="add-todo__title_input"
              type="text"
              placeholder="todo..."
              value={title}
              onChange={(event) => {
                this.setState({
                  title: event.target.value,
                  titleError: false,
                });
              }}
            />
            {titleError
              && <span className="warning">Please, enter a title</span>
            }
          </label>
          <select
            value={person}
            onChange={(event) => {
              this.setState({
                person: event.target.value,
                personError: false,
              });
            }}
          >
            <option value="">Choose user</option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          {personError
            && <span className="warning">Please, choose a person</span>
          }
          <button
            type="submit"
          >
            Add todo
          </button>
        </form>
        <TodoList list={todos} />
      </div>
    );
  }
}

export default App;
