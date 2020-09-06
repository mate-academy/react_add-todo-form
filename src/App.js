import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';

const currentTodoList = todos.map(
  todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }),
);

class App extends React.Component {
  state = {
    task: '',
    userName: '',
    todoList: currentTodoList,
    taskNotAdded: false,
    userNotAdded: false,
  };

  addTodoTask = (event) => {
    this.setState({
      task: event.target.value.replace(/[^A-Za-zА-Яа-яІіЇїЄє0-9 ]+/g, ''),
      taskNotAdded: false,
    });
  }

  addTodoUser = (event) => {
    this.setState({
      userName: event.target.value,
      userNotAdded: false,
    });
  }

  addTodo = (event) => {
    event.preventDefault();
    const { task, userName, todoList } = this.state;

    if (!task && (!userName || userName === 'default')) {
      this.setState({
        taskNotAdded: true,
        userNotAdded: true,
      });
    } else
    if (!task) {
      this.setState({
        taskNotAdded: true,
      });
    } else
    if (!userName || userName === 'default') {
      this.setState({
        userNotAdded: true,
      });
    } else {
      const newTodo = {
        userId: users.find(user => user.name === userName).id,
        id: todoList.length + 1,
        title: task,
        completed: false,
        user: users.find(user => user.name === userName),
      };

      this.setState(state => ({
        task: '',
        userName: '',
        todoList: [
          ...state.todoList,
          newTodo,
        ],
        taskNotAdded: false,
        userNotAdded: false,
      }));
    }
  }

  render() {
    const { task, todoList, taskNotAdded, userNotAdded } = this.state;

    return (
      <div className="App app">
        <h1 className="app__title">Add todo</h1>

        <form
          className="app__form"
          action=""
          method="POST"
          onSubmit={this.addTodo}
        >
          <input
            className="app__text-input"
            type="text"
            placeholder="What to do?"
            maxLength="30"
            autoComplete="off"
            name="task"
            value={task}
            onChange={this.addTodoTask}
          />

          <select
            className="app__select"
            name="userName"
            value={this.state.userName}
            onChange={this.addTodoUser}
          >
            <option value="default">Choose a user</option>
            {users.map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>

          <button className="app__submit" type="submit">Add todo</button>
        </form>

        <section className="app__errors">
          {taskNotAdded
            ? (
              <span className="error app__text-error">
                Please enter the title
              </span>
            ) : ''
          }

          {userNotAdded
            ? (
              <span className="error app__select-error">
                Please choose a user
              </span>
            ) : ''
          }
        </section>

        <TodoList todos={todoList} />
      </div>
    );
  }
}

export default App;
