import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import todosFromApi from './api/todos';
import usersFromApi from './api/users';

const preparedTodos = todosFromApi.map(todo => ({
  user: usersFromApi.find(user => todo.userId === user.id),
  ...todo,
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    todoTitle: '',
    personName: '',
    titleError: false,
    userError: false,
  };

  handleChange = (event) => {
    const { value, name } = event.target;
    const errorName = name === 'todoTitle'
      ? 'titleError'
      : 'userError';

    this.setState({
      [name]: value,
      [errorName]: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { todos, todoTitle, personName } = this.state;

    if (todoTitle.trim() && personName) {
      const newTodo = {
        title: todoTitle,
        completed: false,
        id: todos[todos.length - 1].id + 1,
        user: usersFromApi.find(user => personName === user.name),
      };

      this.setState(state => ({
        todos: [...state.todos, newTodo],
        todoTitle: '',
        personName: '',
      }));

      return;
    }

    if (!todoTitle.trim()) {
      this.setState({
        titleError: true,
        todoTitle: '',
      });
    }

    if (!personName) {
      this.setState({
        userError: true,
      });
    }
  };

  render() {
    const { todos, titleError, userError } = this.state;

    return (

      <div className="App">
        <h1>Add todo form</h1>
        <div className="App__subtitle">
          <p>
            <span>Todos: </span>
            {todos.length}
          </p>
          <p>
            <span>Users: </span>
            {usersFromApi.length}
          </p>
        </div>

        <form
          action="/api/todo"
          method="POST"
          className="App__form"
          onSubmit={this.handleSubmit}
        >

          <div>
            <label htmlFor="todo-title">

              <input
                name="todoTitle"
                type="text"
                id="todo-title"
                className="App__inputs"
                placeholder="whrite the todo here"
                value={this.state.todoTitle}
                onChange={this.handleChange}

              />
            </label>
            {titleError
              && (
                <div className="App__message">
                  add todo to the list
                </div>
              )
            }
          </div>
          <button
            type="submit"
            className="App__button"
          >
            add
          </button>
          <div>
            <label htmlFor="person-name">

              <select
                name="personName"
                id="person-name"
                className="App__inputs"
                value={this.state.personName}
                onChange={this.handleChange}
              >
                <option value="" disabled>Choose a Person</option>
                {usersFromApi.map(user => (
                  <option value={user.name} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
            {userError
              && (
                <div className="App__message">
                  choose someone, please
                </div>
              )
            }
          </div>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
