import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import todos from './api/todos';
import users from './api/users';

const fullList = todos.map(todo => ({
  user: users.find(user => todo.userId === user.id),
  ...todo,
}));

class App extends React.Component {
  state = {
    userList: [...fullList],
    todoTitle: '',
    personName: '',
    unwritten: false,
    unselected: false,
  };

  addTodo = (event) => {
    event.preventDefault();
    const { userList, todoTitle, personName } = this.state;

    if (todoTitle && personName) {
      const newTodo = {
        title: todoTitle,
        complited: false,
        id: userList[userList.length - 1].id + 1,
        user: users.find(user => personName === user.name),
      };

      this.setState(state => ({
        userList: [...state.userList, newTodo],
        todoTitle: '',
        personName: '',
        unwritten: false,
        unselected: false,
      }));

      return;
    }

    if (!todoTitle) {
      this.setState({
        unwritten: true,
      });
    }

    if (!personName) {
      this.setState({
        unselected: true,
      });
    }
  };

  render() {
    const { userList, unwritten, unselected } = this.state;

    return (

      <div className="App">
        <h1>Add todo form</h1>
        <div className="App__subtitle">
          <p>
            <span>Todos: </span>
            {userList.length}
          </p>
          <p>
            <span>Users: </span>
            {users.length}
          </p>
        </div>

        <form
          action="/api/todo"
          method="POST"
          className="App__form"
          onSubmit={(event) => {
            this.addTodo(event);
          }}
        >

          <div>
            <label htmlFor="todo-title">

              <input
                name="todoTitle"
                type="text"
                id="todo-title"
                className="App__inputs"
                placeholder="whrite the todo here"
                value={this.state.todoTitle}
                onChange={(event) => {
                  this.setState({
                    todoTitle: event.target.value,
                  });
                }}

              />
            </label>
            {unwritten
              && (
                <div className="App__message">
                  add todo to the list, please
                </div>
              )
            }
          </div>
          <button
            type="submit"
            className="App__button"
          >
            add
          </button>
          <div>
            <label htmlFor="person-name">

              <select
                name="personName"
                id="person-name"
                className="App__inputs"
                value={this.state.personName}
                onChange={(event) => {
                  this.setState({
                    personName: event.target.value,
                  });
                }}
              >
                <option>Choose a Person</option>
                {users.map(user => (
                  <option value={user.name} key={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </label>
            {unselected
              && (
                <div className="App__message">
                  chose someone, please
                </div>
              )
            }
          </div>
        </form>
        <TodoList todos={userList} />
      </div>
    );
  }
}

export default App;
