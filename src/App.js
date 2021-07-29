import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

class App extends React.Component {
  state = {
    currentUserId: 0,
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
    const { currentUserId, todoText, todoList } = this.state;

    if (!todoText) {
      this.setState({
        invalidTodo: true,
      });

      return;
    }

    if (!currentUserId) {
      this.setState({
        invalidUser: true,
      });

      return;
    }

    const newTodo = {
      userId: Number(currentUserId),
      id: todoList.length + 1,
      title: todoText,
      completed: false,
    };

    this.setState(prevState => ({
      todoList: [...prevState.todoList, newTodo],
      todoText: '',
      currentUserId: 0,
      invalidTodo: false,
      invalidUser: false,
    }));
  }

  findRequiredUser = (todo) => {
    const foundUser = users.find(
      user => user.id === todo.userId,
    );

    return foundUser.name;
  }

  render() {
    const { currentUserId,
      todoText,
      todoList,
      invalidTodo,
      invalidUser } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        {
          invalidTodo
            ? <span>Specify correct todo</span>
            : <></>
        }
        {
          invalidUser
            ? <span>Choose user</span>
            : <></>
        }
        <form
          onSubmit={
          (event) => {
            event.preventDefault();
            this.addTodo();
          }
        }
          className="form"
        >
          <input
            name="todoText"
            type="text"
            placeholder="Add ToDo"
            value={todoText}
            onChange={this.handleChange}
          />
          <select
            name="currentUserId"
            value={currentUserId}
            onChange={this.handleChange}
          >
            <option
              value="0"
              hidden
            >
              Choose user
            </option>
            {users.map(
              user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ),
            )}
          </select>
          <button
            type="submit"
          >
            Confirm
          </button>
        </form>
        <div>
          <ul className="todoList">
            {todoList.map(
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
                    {this.findRequiredUser(todo)}
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
