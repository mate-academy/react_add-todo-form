import React, { PureComponent } from 'react';
import { TodoList } from './components/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(
  todo => ({
    ...todo,
    user: users.find(person => person.id === todo.userId),
  }),
);

class App extends PureComponent {
  state = {
    todosList: preparedTodos,
    newTodo: '',
    selectedUserId: 0,
    isValidTitle: false,
    isValidUser: false,
  }

  addTodo = (newTodo, selectedUserId) => {
    const { todosList } = this.state;

    const newTask = {
      user: users.find(person => person.id === selectedUserId),
      id: todosList.length + 1,
      title: newTodo,
      completed: false,
    };

    this.setState(state => ({
      todosList: [...state.todosList, newTask],
    }));
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { newTodo, selectedUserId } = this.state;

    this.setState({
      isValidTitle: !newTodo,
      isValidUser: !selectedUserId,
    });

    if (!newTodo) {
      return;
    }

    if (!selectedUserId) {
      return;
    }

    this.addTodo(newTodo, selectedUserId);

    this.setState({
      newTodo: '',
      selectedUserId: 0,
    });
  }

  handleInputChange = (event) => {
    this.setState({
      newTodo: event.target.value,
      isValidTitle: false,
    });
  }

  handleSelectChange = (event) => {
    this.setState({
      selectedUserId: Number(event.target.value),
      isValidUser: false,
    });
  }

  render() {
    const {
      todosList,
      newTodo,
      selectedUserId,
      isValidTitle,
      isValidUser,
    } = this.state;

    return (
      <div className="App">
        <h1 className="title">
          Add todo form
        </h1>

        <form
          onSubmit={this.handleFormSubmit}
          className="field"
        >
          <div>
            <input
              name="todo"
              placeholder="Please enter the title"
              className="input mb-4"
              value={newTodo}
              onChange={this.handleInputChange}
            />
            {isValidTitle && (
              <p className="error mb-4">Please enter the title</p>
            )}
          </div>
          <div className="select is-warning mb-4">
            <select
              value={selectedUserId}
              onChange={this.handleSelectChange}
            >
              <option>
                Choose a user
              </option>
              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {isValidUser && (
              <p className="error mb-4">Please choose a user</p>
            )}
          </div>
          <button type="submit" className="button is-warning">
            Add
          </button>

        </form>

        <TodoList listOfTodods={todosList} />
      </div>
    );
  }
}

export default App;
