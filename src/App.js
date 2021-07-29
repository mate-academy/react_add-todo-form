import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
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
    user: '',
    title: '',
    isCorrectTitle: false,
    isCorrectUserName: false,
  }

  addTodo = () => {
    this.setState(state => ({
      todos: [...state.todos, {
        userId: users.find(user => user.id === state.id),
        id: state.todos.length + 1,
        title: state.title,
        completed: false,
        user: users.find(user => user.name === state.user),
      }],
    }));
  }

  hendlerChange = (event) => {
    const { user, title } = this.state;

    event.preventDefault();
    this.setState(state => ({
      isCorrectUserName: !user,
    }));

    if (title.length < 3) {
      this.setState({
        isCorrectTitle: true,
      });

      return;
    }

    if (!user) {
      return;
    }

    this.addTodo();

    this.setState({
      user: '',
      title: '',
    });
  }

  render() {
    const {
      isCorrectTitle,
      isCorrectUserName,
    } = this.state;

    return (
      <>
        <form
          onSubmit={this.hendlerChange}
        >
          <label>
            Title
            <input
              value={this.state.title}
              onChange={(event) => {
                this.setState({
                  title: event.target.value,
                  isCorrectTitle: false,
                });
              }}
            />

            {isCorrectTitle
              ? (
                <span>
                  Please enter the title
                </span>
              )
              : ''}
          </label>

          <label>
            User
            <select
              id="users"
              value={this.state.user}
              onChange={(event) => {
                this.setState({
                  user: event.target.value,
                  isCorrectUserName: false,
                });
              }}
            >
              <option value="" disabled>
                --Select user--
              </option>

              {users.map(({ id, name }) => (
                <option value={name} key={id}>
                  {name}
                </option>
              ))}
            </select>

            {isCorrectUserName
              ? (
                <span>
                  Please choose a user
                </span>
              )
              : ''}
          </label>

          <button
            type="submit"
          >
            Add
          </button>
        </form>

        <TodoList todos={this.state.todos} />
      </>
    );
  }
}

export default App;
