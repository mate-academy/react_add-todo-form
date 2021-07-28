import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    currentUser: 0,
    userList: [...users],
    todoText: '',
    todoList: [...todos],
    invalidTodo: false,
    invalidUser: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  addTodo = () => {
    const { currentUser, todoText, todoList } = this.state;

    if (!todoText) {
      this.setState({
        invalidTodo: true,
      });

      return;
    }

    if (!currentUser) {
      this.setState({
        invalidUser: true,
      });

      return;
    }

    const newTodo = {
      userId: +currentUser,
      id: todoList.length + 1,
      title: todoText,
      completed: false,
    };

    this.setState(prevState => ({
      todoList: [...prevState.todoList, newTodo],
      todoText: '',
      currentUser: 0,
      invalidTodo: false,
      invalidUser: false,
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        {
          this.state.invalidTodo
            ? <span>Specify correct todo</span>
            : <></>
        }
        {
          this.state.invalidUser
            ? <span>Choose user</span>
            : <></>
        }
        <form
          onSubmit={
          (event) => {
            event.preventDefault();
          }
        }
          className="form"
        >
          <input
            name="todoText"
            type="text"
            placeholder="Add ToDo"
            value={this.state.todoText}
            onChange={this.handleChange}
          />
          <select
            name="currentUser"
            value={this.state.currentUser}
            onChange={this.handleChange}
          >
            <option
              value=""
              hidden
            >
              Choose user
            </option>
            {this.state.userList.map(
              user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ),
            )}
          </select>
          <button
            type="submit"
            onClick={this.addTodo}
          >
            Confirm
          </button>
        </form>
        <div>
          <ul className="todoList">
            {this.state.todoList.map(
              todo => (
                <li key={todo.id} className="todoItem">
                  <div>
                    Title:
                    {' '}
                    {todo.title}
                  </div>
                  <div>
                    User:
                    {' '}
                    {
                      this.state.userList.find(
                        user => user.id === todo.userId,
                      ).name
                    }
                  </div>
                  <div>
                    Completed:
                    {' '}
                    {
                      todo.completed ? 'Yes' : 'No'
                    }
                  </div>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
