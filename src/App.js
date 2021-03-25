import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todoList: todos,
    user: 'Choose User',
    title: '',
    createTitleError: false,
    createUserError: false,
  }

  handleSelectChange = (event) => {
    this.setState({
      user: event.target.value,
    });

    if (event.target.value !== 'Choose User') {
      this.setState({
        createUserError: false,
      });
    }
  }

  handleInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
    if (event.target.value !== '') {
      this.setState({
        createTitleError: false,
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.title === '') {
      this.setState({
        createTitleError: true,
      });
    }

    if (this.state.user === 'Choose User') {
      this.setState({
        createUserError: true,
      });
    }

    if (this.state.user === 'Choose User' || this.state.title === '') {
      return;
    }

    const createdTodo = {
      userId: users.find(user => user.name === this.state.user).id,
      id: this.state.todoList.length + 1,
      title: this.state.title,
      completed: false,
    };

    this.setState(prevState => ({
      todoList: [...prevState.todoList, createdTodo],
      user: 'Choose User',
      title: '',
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        {
          this.state.createTitleError
            ? (
              <p
                className="error"
              >
                Warning: Please enter the title!!!
              </p>
            )
            : ''
          }
        {
          this.state.createUserError
            ? (
              <p className="error">Warning: Please choose a user</p>
            )
            : ''
        }
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          <select
            value={this.state.user}
            onChange={this.handleSelectChange}
          >
            <option>
              Choose User
            </option>
            {users.map(user => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>
          <button
            type="submit"
          >
            Add
          </button>
        </form>
        <ul className="todolist">
          {this.state.todoList.map(todo => (
            <li key={todo.id}>
              <div className="todolist__card card">
                <div>
                  {`Title: `}
                  {todo.title}
                </div>
                <div>
                  {`User: `}
                  {
                    users.find(user => todo.userId === user.id).name
                  }
                </div>
                <div>
                  {`Completed: `}
                  {todo.completed
                    ? (
                      <span role="img" aria-label="Tick">
                        &#9989;
                      </span>
                    )
                    : (
                      <span role="img" aria-label="Cross">
                        &#10060;
                      </span>
                    )
                  }
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
