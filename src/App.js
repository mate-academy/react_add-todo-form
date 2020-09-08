import React from 'react';
import './App.css';
import classNames from 'classnames';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodo = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

class App extends React.Component {
  state = {
    todoList: preparedTodo,
    users: usersFromServer,
    executor: '',
    titleTodo: '',
    visibilityExecutorAlert: false,
    visibilityAddAlert: false,
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  addTodo = () => {
    const { users, executor, todoList, titleTodo } = this.state;
    const selectedUser = users.find(user => user.name === executor);

    if (!executor || !titleTodo) {
      this.setState({
        visibilityExecutorAlert: !executor,
        visibilityAddAlert: !titleTodo,
      });

      return;
    }

    this.setState(state => ({
      todoList: [
        ...state.todoList,
        {
          title: state.titleTodo, user: selectedUser, id: todoList.length + 1,
        },
      ],
      executor: '',
      titleTodo: '',
      visibilityExecutorAlert: false,
      visibilityAddAlert: false,
    }));
  }

  render() {
    const {
      users,
      todoList,
      visibilityExecutorAlert,
      visibilityAddAlert,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {usersFromServer.length}
        </p>

        <form onSubmit={this.handleSubmit}>
          <select
            name="user"
            value={this.state.executor}
            onChange={event => this.setState({
              executor: event.target.value,
              visibilityExecutorAlert: false,
            })}
          >
            <option
              value={this.state.executor}
              onChange={event => this.setState({
                executor: '',
              })}
            >
              Choose a executor
            </option>
            {users.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}

          </select>

          <input
            type="text"
            value={this.state.titleTodo}
            onChange={event => this.setState({
              titleTodo: event.target.value.trimLeft(),
              visibilityAddAlert: false,
            })}
            placeholder="add task"
          />

          <span className={classNames({
            warning__text: true,
            'warning--visibility': visibilityExecutorAlert,
          })}
          >
            Please, choose a user
          </span>

          <span className={classNames({
            warning__text: true,
            'warning--visibility': visibilityAddAlert,
          })}
          >
            Please, write a task for user
          </span>

          <div className="listOfTodo">
            {todoList.map(todo => (
              <div key={todo.id} className="listOfTodo__todo todo">
                <span className="todo__number">
                  {todo.id}
                </span>

                <h2 className="todo__title">
                  {`Title: ${todo.title}`}
                </h2>

                <h3>
                  {`User: ${todo.user.name}`}
                </h3>

                <span>
                  {`User id: ${todo.user.id}`}
                </span>
              </div>
            ))}
          </div>

          <button
            type="submit"
            onClick={this.addTodo}
            className="button"
          >
            Добавить задачу
          </button>
        </form>
      </div>
    );
  }
}

export default App;
