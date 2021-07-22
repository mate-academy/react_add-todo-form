import React from 'react';
import './App.css';
import TodoList from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

const list = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    todos: [...list],
    title: '',
    name: '',
    todoError: false,
    userError: false,
  }

  handleChangeTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleChangeName = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    if (this.state.title === '') {
      this.setState({ todoError: true });
    }

    if (this.state.name === '') {
      this.setState({ userError: true });
    }

    if (this.state.name && this.state.title) {
      this.setState(state => ({
        todos: [
          ...state.todos,
          {
            user: state.name,
            title: state.title,
            completed: false,
            userId: users.find(user => user.name === state.name).id,
            id: state.todos.length + 1,
          },
        ],
      }));

      this.setState({
        name: '',
        title: '',
        todoError: false,
        userError: false,
      });
    }
  };

  render() {
    const newTodo = this.state.todos;

    return (
      <div className="App">
        <form onSubmit={this.handleFormSubmit}>
          <input
            className="App__text"
            type="text"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleChangeTitle}
          />

          {this.state.todoError && (
            <span>Please enter the title</span>
          )}

          <select
            value={this.state.name}
            onChange={this.handleChangeName}
            className="App__select"
          >
            <option
              value=""
            >
              Choose a user
            </option>
            {users.map(user => (
              <option value={user.name} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {this.state.userError && (
            <span>Please choose a user</span>
          )}

          <button type="submit" className="button">Add</button>
        </form>
        <TodoList userList={newTodo} />
      </div>
    );
  }
}

export default App;
