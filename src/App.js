import React from 'react';
import './App.css';

import TodoList from './Components/TodoList';

import users from './api/users';
import todoss from './api/todos';

const preparedTodos = todoss.map(todo => ({
  ...todo,
  selectedUserId: users.find(user => user.id === todo.userId).id,
}));

export class App extends React.Component {
  state = {
    todos: preparedTodos,
    newTodoTitle: '',
    selectedUserId: '',
    noTitle: false,
    noSelect: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const {
      newTodoTitle,
      selectedUserId,
    } = this.state;

    if (!newTodoTitle && !selectedUserId) {
      this.setState({
        noTitle: true,
        noSelect: true,
      });

      return;
    }

    if (newTodoTitle.replace(/[^a-zA-Z0-9]/g, '').length === 0) {
      this.setState({
        noTitle: true,
      });

      return;
    }

    if (!selectedUserId) {
      this.setState({
        noSelect: true,
      });

      return;
    }

    this.setState((prevState) => {
      const newTodo = {
        id: prevState.todos.length + 1,
        userId: prevState.selectedUserId,
        title: prevState.newTodoTitle,
        completed: false,
      };

      return ({
        todos: [...prevState.todos, newTodo],
        newTodoTitle: '',
        selectedUserId: '',
        noTitle: false,
        noSelect: false,
      });
    });
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      todos,
      newTodoTitle,
      selectedUserId,
      noTitle,
      noSelect,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form
          action="/api/todos"
          method="POST"
          onSubmit={this.handleSubmit}
        >
          <div className="form__filed">
            <label htmlFor="todo__name-new">
              Todo name
            </label>

            <input
              type="text"
              name="newTodoTitle"
              value={newTodoTitle}
              id="todo__name-new"
              onChange={this.handleChange}
              placeholder="Todo name"
            />
            <span
              className="form__error"
            >
              {noTitle
              && 'Please add alphanumeric todo'}
            </span>
            <br />

          </div>

          <div className="form__filed">
            <label htmlFor="user__id-new">
              UserID
            </label>

            <select
              name="selectedUserId"
              id="user__id-new"
              value={selectedUserId}
              onChange={this.handleChange}
            >
              <option>Choose UserID</option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            <span
              className="form__error"
            >
              {noSelect
                && 'Please choose a user'}
            </span>
            <br />
          </div>

          <button
            type="submit"
            className="buttonAdd"
          >
            Add
          </button>

        </form>

        <TodoList
          todos={todos}
        />
      </div>
    );
  }
}

export default App;
