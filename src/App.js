import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    todoList: todos,
    user: 'Chose User',
    title: '',
  }

  handleSelectChange = (event) => {
    this.setState({
      user: event.target.value,
    });
  }

  handleInputChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
  }

  handleClick = () => {
    const createdTodo = {
      userId: users.find(user => user.name === this.state.user).id,
      id: this.state.todoList.length + 1,
      title: this.state.title,
      completed: true,
    };

    this.setState(prevState => ({
      todoList: [...prevState.todoList, createdTodo],
      user: 'Chose User',
      title: '',
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
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
              Chose User
            </option>
            {users.map(user => (
              <option>{user.name}</option>
            ))}
          </select>
          <button
            type="submit"
            onClick={this.handleClick}
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
