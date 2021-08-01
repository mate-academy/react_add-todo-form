import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todosList: preparedTodos,
    newTodo: '',
    selectedUserId: 0,
    errorTitle: false,
    errorUser: false,
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
      errorTitle: !newTodo,
      errorUser: !selectedUserId,
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
      errorTitle: false,
    });
  }

  handleSelectChange = (event) => {
    this.setState({
      selectedUserId: Number(event.target.value),
      errorUser: false,
    });
  }

  render() {
    const {
      todosList,
      newTodo,
      selectedUserId,
      errorTitle,
      errorUser,
    } = this.state;

    return (
      <div className="App">
        <h1>
          Add todo form
        </h1>

        <form
          onSubmit={this.handleFormSubmit}
          className="App__form"
        >
          <div>
            <input
              name="todo"
              placeholder="Please enter the title"
              className="input is-primary is-large"
              value={newTodo}
              onChange={this.handleInputChange}
            />
            {errorTitle && (
              <p className="error mb-4">Please enter the title</p>
            )}
          </div>
          <div className="select is-medium">
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

            {errorUser && (
              <p className="error mb-4">Please choose a user</p>
            )}
          </div>
          <button type="submit" className="button is-primary">
            Add
          </button>
        </form>

        <TodoList listOfTodods={todosList} />
      </div>
    );
  }
}

export default App;
