import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const personalTodos = todos.map(todo => (
  {
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }
));

class App extends React.Component {
  state = {
    id: personalTodos.length,
    value: '',
    selectValue: '',
    todoList: [...personalTodos],
    showErrorField: false,
  }

  handleInputChange = (event) => {
    this.setState({
      value: event.target.value,
      showErrorField: false,
    });
  }

  addTodo = () => {
    if (!this.state.value || !this.state.selectValue) {
      this.setState(state => ({
        showErrorField: !state.value,
        showErrorSelect: !state.selectValue,
      }));

      return;
    }

    const title = this.state.value;
    const currentUser = users.find(user => (
      user.name === this.state.selectValue
    ));

    this.setState(state => ({
      id: state.id + 1,
      value: '',
      todoList: [
        ...state.todoList,
        {
          userId: currentUser.id,
          id: state.id + 1,
          title,
          completed: false,
          user: currentUser,
        },
      ],
      selectValue: '',
    }));
  }

  addName = (event) => {
    this.setState({
      selectValue: event.target.value,
      showErrorSelect: false,
    });
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <select value={this.state.selectValue} onChange={this.addName}>
          <option value="">
            Select user
          </option>
          {
            users.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))
          }
        </select>
        {
          this.state.showErrorSelect
          && <span>Choose user</span>
        }
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleInputChange}
        />
        {
          this.state.showErrorField
          && <span>add todo</span>
        }
        <button
          type="button"
          onClick={this.addTodo}
        >
          Add todo
        </button>
        <ul>
          {
            [...this.state.todoList].map(todo => (
              <li key={todo.id}>
                {todo.user.name}
                {'-------------'}
                {todo.title}
                {'-------------'}
                {
                  todo.completed
                    ? 'Completed'
                    : 'No completed'
                }
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
