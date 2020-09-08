import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => (user.id === todo.userId)),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    title: '',
    username: '',
    titleError: false,
    userError: false,
  }

  addTodo = (event) => {
    const { title, username, userError, titleError } = this.state;

    event.preventDefault();

    if (!title.trim()) {
      this.setState({
        titleError: true,
      });
    }

    if (!username) {
      this.setState({
        userError: true,
      });
    }

    if (userError || titleError) {
      this.setState(state => ({
        todos: [
          {
            userId: users.find(user => state.username === user.name).id,
            id: state.todos.length + 1,
            title: state.title,
            completed: false,
            user: users.find(user => state.username === user.name),
          },
          ...state.todos,
        ],
      }));
      this.setState({
        title: '',
        username: '',
        userError: false,
        titleError: false,

      });
    }
  }

  changeState = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  render() {
    const { title, username, titleError, userError } = this.state;

    return (
      <>
        <div className="info">
          <h1>Todos</h1>
        </div>
        <div className="form">
          <form>
            <input
              placeholder="Todo..."
              name="title"
              type="text"
              value={title}
              onChange={this.changeState}
              className="addTitle"
            />
            {titleError && (<span className="error">Please enter title!</span>)}
            <div>
              <select
                name="username"
                value={username}
                onChange={this.changeState}
                className="addUser"
              >
                <option>Choose a user</option>
                {users.map(user => (
                  <option key={user.id}>{user.name}</option>
                ))}
              </select>
              {userError
                && (<span className="error">Please select user!</span>)
              }
            </div>
            <button
              type="submit"
              className="button"
              onClick={this.addTodo}
            >
              Add todo
            </button>
          </form>
        </div>
        <div className="content">
          <TodoList list={this.state.todos} />
        </div>
      </>
    );
  }
}

export default App;
