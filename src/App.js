import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const todosFromServer = todos.map(todo => ({
  ...todo,
  userName: users.find(user => user.id === todo.userId).name,
}));

class App extends React.Component {
  state = {
    todoList: todosFromServer,
    task: '',
    userName: '',
    id: todosFromServer[todosFromServer.length - 1].id + 1,
    errorUser: false,
    errorTask: false,
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({
      [name]: value.replace(/[^ a-z ]/gi, ''),
      errorUser: false,
      errorTask: false,
    });
  }

  hendleSubmit = (event) => {
    event.preventDefault();

    const { task, userName } = this.state;

    if (!task) {
      this.setState({ errorTask: true });

      return;
    }

    if (!userName) {
      this.setState({ errorUser: true });

      return;
    }

    this.setState((state) => {
      const newTodo = {
        name: state.userName,
        userId: state.users.find(user => user.name === state.userName).id,
        title: state.task,
        completed: false,
        id: state.id,
      };

      return {
        id: state.id + 1,
        todoList: [...state.todoList, newTodo],
        task: '',
        userName: '',
        errorUser: false,
      };
    });
  }

  render() {
    const {
      task,
      todoList,
      people,
      userName,
      errorUser,
      errorTask,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <div className="todolist">
          <form className="form" onSubmit={this.hendleSubmit}>
            <div>
              {errorTask && (
                <p className="form__error">Please enter the title</p>)}
              <label htmlFor="input-task">
                <input
                  type="text"
                  name="task"
                  id="input-task"
                  value={task}
                  onChange={this.handleChange}
                  placeholder="Write task"
                  className="form__input"
                />
              </label>
            </div>

            <div>
              {errorUser && (
                <p className="form__error">Please choose a user</p>)}
              <select
                name="userName"
                value={userName}
                onChange={this.handleChange}
                className="form__select"
              >
                <option>Choose a user</option>
                {people.map(user => (
                  <option key={user.id}>{user.name}</option>
                ))}
              </select>
              <button
                type="submit"
                className="form__button"
              >
                Add
              </button>
            </div>
          </form>
          <TodoList todos={todoList} />
        </div>
      </div>
    );
  }
}

export default App;
