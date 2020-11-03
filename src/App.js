import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

import SimpleReactValidator from 'simple-react-validator';
import users from './api/users';
import todos from './api/todos';
import { TodoList } from './TodoList/TodoList';

export const preparedUsersWithTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  constructor() {
    super();
    this.validator = new SimpleReactValidator();
  }

  state = {
    title: '',
    user: '',
    todos: preparedUsersWithTodos,
  };

  addTodo = (todoTitle, userName) => {
    const username = users.find(user => user.name === userName);

    this.setState((prevState) => {
      const newTodo = {
        id: prevState.todos.length + 1,
        title: todoTitle,
        completed: false,
        user: username,
      };

      return {
        todos: [...prevState.todos, newTodo],
      };
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.validator.allValid()) {
      this.addTodo(this.state.title, this.state.user);
    } else {
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  render() {
    const { user, title } = this.state;

    return (
      <div className="App">
        <TodoList todos={this.state.todos} />
        <form onSubmit={this.handleSubmit}>
          <div>
            <p>Todo Task</p>
            <input
              type="text"
              placeholder="Type new todo"
              value={title}
              onChange={(event) => {
                this.setState({
                  title: event.target.value,
                });
              }}
            />
            {this.validator.message(`todo task`, title, 'required|alpha_space')}
          </div>
          <div>
            <p>Choose user</p>
            <select
              name="name"
              value={user}
              onChange={(event) => {
                this.setState({
                  user: event.target.value,
                });
              }}
            >
              <option value="" disabled="disabled">Select user</option>
              {users.map(item => (
                <option
                  key={item.name}
                  value={item.name}
                >
                  {item.name}
                </option>
              ))}
            </select>
            {this.validator.message('user', user, 'required|string')}
          </div>

          <button
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>

    );
  }
}

export default App;
