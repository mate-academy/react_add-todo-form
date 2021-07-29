import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(person => person.id === todo.userId),
}));

export class App extends React.PureComponent {
  state = {
    addedTodos: preparedTodos,
    todoTitle: '',
    selectedUserId: 0,
    isTitleValid: false,
    isUserValid: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { todoTitle, selectedUserId } = this.state;

    this.setState({
      isTitleValid: !todoTitle,
      isUserValid: !selectedUserId,
    });

    if (!todoTitle || !selectedUserId) {
      return;
    }

    this.addTodo(todoTitle, selectedUserId);
    this.resetForm();
  };

  addTodo = (todoTitle, selectedUserId) => {
    const { addedTodos } = this.state;

    const newTodo = {
      user: users.find(person => person.id === selectedUserId),
      title: todoTitle,
      id: addedTodos.length + 1,
      completed: false,
    };

    this.setState(state => ({
      addedTodos: [...state.addedTodos, newTodo],
    }));
  }

  onChangeTitle = (event) => {
    this.setState({
      todoTitle: event.target.value,
    });
  };

  onChangeUser = (event) => {
    this.setState({
      selectedUserId: Number(event.target.value),
    });
  };

  resetForm = () => {
    this.setState({
      todoTitle: '',
      selectedUserId: 0,
    });
  }

  render() {
    const {
      addedTodos,
      todoTitle,
      selectedUserId,
      isTitleValid,
      isUserValid,
    } = this.state;

    return (
      <div className="App">
        <TodoList todos={addedTodos} />
        <form onSubmit={this.handleSubmit}>
          <input
            className="input is-info is-medium is-rounded"
            type="text"
            value={todoTitle}
            placeholder="Please enter the title"
            onChange={this.onChangeTitle}
          />
          {isTitleValid && (
            <p>Please enter the title</p>
          )}
          <div className="select is-info is-rounded is-medium">
            <select
              value={selectedUserId}
              onChange={this.onChangeUser}
            >
              <option value="0">
                Choose a user
              </option>
              {users.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          {isUserValid && (
            <p>Please choose a user</p>
          )}
          <button
            className="button is-info is-medium"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default App;
