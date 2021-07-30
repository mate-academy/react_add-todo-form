import React from 'react';
import './App.css';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId).name,
}));

const todosKey = 'todos';

class App extends React.Component {
  todosFromStorage = JSON.parse(window.localStorage.getItem(todosKey));

  state = {
    todoInput: '',
    selectedUserId: 0,
    todos: this.todosFromStorage || preparedTodos,
    isSelectedUser: true,
    isAddedTodo: true,
  }

  handleTodoChanger = (event) => {
    this.setState({
      todoInput: event.target.value,
      isAddedTodo: true,
    });
  }

  handleUserChanger = (event) => {
    this.setState({
      selectedUserId: Number(event.target.value),
      isSelectedUser: true,
    });
  }

  addTodo = (todo) => {
    this.setState(
      prevState => ({
        todos: [
          ...prevState.todos,
          {
            ...todo,
            id: prevState.todos.length + 1,
          },
        ],
      }),
      () => {
        const stringifiedTodos = JSON.stringify(this.state.todos);

        window.localStorage.setItem(todosKey, stringifiedTodos);
      },
    );
  }

  handleSubmit = (event) => {
    const { selectedUserId, todoInput } = this.state;

    event.preventDefault();
    this.setState(
      prevState => ({
        isSelectedUser: prevState.selectedUserId > 0,
        isAddedTodo: prevState.todoInput.length > 0,
      }),
    );

    if (selectedUserId > 0 && todoInput.length > 0) {
      this.setState({
        todoInput: '',
        selectedUserId: 0,
      });

      const todo = {
        userId: users.find(user => user.id === selectedUserId).id,
        title: todoInput,
        completed: false,
        user: users.find(user => user.id === selectedUserId).name,
      };

      this.addTodo(todo);
    }
  };

  render() {
    const { todoInput, selectedUserId, isSelectedUser, isAddedTodo }
    = this.state;

    return (
      <div className="App container">
        <h1>Add todo form</h1>
        <form className="row" onSubmit={this.handleSubmit}>
          <div className="mb-3 col">
            <input
              type="text"
              className="form-control"
              placeholder="New TODO"
              value={todoInput}
              onChange={this.handleTodoChanger}
            />
            {isAddedTodo || <p>Please enter the title</p>}
          </div>
          <div className="mb-3 col">
            <select
              className="form-select form-select-sm"
              aria-label=".form-select-sm example"
              value={selectedUserId}
              onChange={this.handleUserChanger}
            >
              <option disabled value="0">Choose user</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {isSelectedUser || <p>Please choose a user</p>}
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-3 col"
          >
            Add TODO
          </button>
        </form>
        <TodoList prepared={this.state.todos} />
      </div>
    );
  }
}

export default App;
