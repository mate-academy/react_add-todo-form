import React from 'react';
import './App.css';

import { ToDoList } from './components/ToDoList';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    newTask: '',
    chooseUser: '',
    newTaskErr: false,
    chooseUserErr: false,
    renderList: preparedTodos,
    id: preparedTodos.length + 1,
  }

  handlerNewTask = (event) => {
    this.setState({
      newTask: event.target.value,
      newTaskErr: false,
    });
  }

  handlerChooseUser = (event) => {
    this.setState({
      chooseUser: event.target.value,
      chooseUserErr: false,
    });
  }

  addNewTodoItem = (event) => {
    event.preventDefault();

    if (!this.state.chooseUser.length) {
      this.setState({
        chooseUserErr: true,
      });
    }

    if (!this.state.newTask.trim().length) {
      this.setState({
        newTaskErr: true,
      });
    }

    if (this.state.chooseUser.length && this.state.newTask.trim().length) {
      this.setState((state) => {
        const newTodo = {
          id: state.id + 1,
          title: state.newTask,
          user: state.chooseUser,
          completed: false,
        };

        return ({
          id: state.id + 1,
          renderList: [...state.renderList, newTodo],
          newTask: '',
          chooseUser: '',
        });
      });
    }
  }

  render() {
    const { newTask, chooseUser } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.addNewTodoItem}>
          <label htmlFor="newTask">
            <p>Add task</p>
            {this.state.newTaskErr && (
              <span>
                Please enter the title
                {' '}
              </span>
            )}
            <input
              type="text"
              name="newTask"
              id="newTask"
              placeholder="Add new task"
              value={newTask}
              onChange={this.handlerNewTask}
            />
          </label>
          <label htmlFor="chooseUser">
            <p>Choose user</p>
            {this.state.chooseUserErr && (
              <span>
                Please choose a user
                {' '}
              </span>
            )}
            <select
              id="chooseUser"
              name="chooseUser"
              value={chooseUser}
              onChange={this.handlerChooseUser}
            >
              <option value="">
                Choose a user
              </option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
          >
            Add
          </button>

        </form>
        <ToDoList
          todos={this.state.renderList}
        />
      </div>
    );
  }
}

export default App;
