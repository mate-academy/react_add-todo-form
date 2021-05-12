import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import users from './api/users';
import todos from './api/todos';

const prepareTodos = todos.map(todo => (
  {
    ...todo, user: users.find(user => todo.userId === user.id),
  }
));

class App extends React.Component {
  state = {
    todos: prepareTodos,
    selectValue: 'Choose a user',
    inputValue: '',
    errorSelect: false,
    errorInput: false,
  }

  handleInputChange = (e) => {
    this.setState({
      inputValue: e.target.value,
      errorInput: false,
    });
  }

  handleUserChange = (e) => {
    this.setState({
      selectValue: e.target.value,
      errorSelect: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { inputValue, selectValue } = this.state;

    const findUser = users.find(user => user.name === selectValue);

    if (!inputValue.length) {
      this.setState({
        errorInput: true,
      });
    }

    if (!findUser) {
      this.setState({
        errorSelect: true,
      });
    }

    if (inputValue.length && findUser) {
      const newToto = {
        userId: findUser.id,
        id: todos[todos.length - 1].id + 1,
        title: inputValue,
        completed: false,
        user: findUser,
      };

      this.setState({
        todos: [...todos, newToto],
        inputValue: '',
        selectValue: 'Choose a user',
        errorSelect: false,
        errorInput: false,
      });
    }
  }

  render() {
    const { selectValue, inputValue } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <form onSubmit={this.handleSubmit}>
          <input
            type="string"
            value={inputValue}
            name="inputValue"
            onChange={this.handleInputChange}
            placeholder="Description"
          />
          {this.state.errorInput && <span>Please enter the title</span>}
          <select
            value={selectValue}
            name="selectValue"
            onChange={this.handleUserChange}
          >
            <option key="Choose a user" disabled>Choose a user</option>
            {users.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          {this.state.errorSelect && <span>Please choose a user</span>}
          <button type="submit">Add</button>
        </form>
        <div>
          <TodoList todoList={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
