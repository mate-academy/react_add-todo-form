import React from 'react';
import './App.css';
import { TodoList } from './Components/TodoList/TodoList';
import users from './api/users';
import todos from './api/todos';

const preparedTodos = [...todos].map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    title: '',
    id: preparedTodos.length + 1,
    userId: 0,
    titleError: false,
    userError: false,
  }

  addTitle = (event) => {
    this.setState({ title: event.target.value });
    this.setState({ titleError: false });
  };

  addUser = (event) => {
    this.setState({ userId: +event.target.value });
    this.setState({ userError: false });
  }

  addTask = () => {
    if (this.state.title.trim().length > 0 && this.state.userId > 0) {
      this.setState(state => ({
        todos: [...state.todos,
          {
            userId: state.userId,
            id: state.id,
            title: state.title,
            completed: false,
            user: users.find(user => user.id === state.userId),
          },
        ],
        id: state.todos.length + 1,
      }));

      this.setState({
        userId: 0,
        title: '',
      });
    } else {
      if (this.state.title.trim().length === 0) {
        this.setState({
          titleError: true,
        });
      }

      if (this.state.userId === 0) {
        this.setState({
          userError: true,
        });
      }
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            this.addTask();
          }}
          className="form"
        >
          <input
            type="text"
            name="title"
            placeholder="Name of task"
            value={this.state.title}
            onChange={this.addTitle}
          />
          {this.state.titleError
            && <span className="titleError">Please enter the title</span>}
          <select
            name="user"
            value={this.state.userId}
            onChange={this.addUser}
          >
            <option value="">
              Chose the user
            </option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {this.state.userError
            && <span className="userError">Please enter the user</span>}
          <button type="submit">
            Add Task
          </button>
        </form>
        <p>
          <TodoList todos={this.state.todos} />
          {users.length}
        </p>
      </div>
    );
  }
}

export default App;
