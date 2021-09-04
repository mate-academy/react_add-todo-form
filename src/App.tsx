import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

interface State {
  visualisedTodos: any,
  userName: string,
  todoTitle: string,
  isDisabled: boolean,
  errorTitle: boolean,
  errorUser: boolean,
}

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user: any,
}

class App extends React.Component<{}, State> {
  state = {
    visualisedTodos: [],
    userName: '',
    todoTitle: '',
    isDisabled: false,
    errorTitle: false,
    errorUser: false,
  };

  componentDidMount() {
    const updateTodos = todos.map(todo => (
      {
        ...todo,
        user: users.find(user => user.id === todo.userId),
      }
    ));

    this.setState({
      visualisedTodos: updateTodos,
    });
  }

  setUser = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userName: target.value,
      isDisabled: true,
      errorUser: false,
    });
  };

  setTodo = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const value = target.value.replace(/[^0-9a-zа-яё\s]/gi, '');

    this.setState({
      todoTitle: value,
      errorTitle: false,
    });
  };

  addTodo = () => {
    const {
      visualisedTodos,
      userName,
      todoTitle,
    } = this.state;

    this.setState({
      errorTitle: !todoTitle,
      errorUser: !userName,
    });

    if (userName && todoTitle) {
      const userId: any = users.find(({ name }) => name === userName)?.id;

      const newTodo: Todo = {
        userId: +userId,
        id: Date.now(),
        title: todoTitle,
        completed: false,
        user: users.find(user => user.id === userId),
      };

      this.setState({
        visualisedTodos: [...visualisedTodos, newTodo],
        userName: '',
        todoTitle: '',
        isDisabled: false,
      });
    }
  };

  render() {
    const {
      visualisedTodos,
      userName,
      todoTitle,
      isDisabled,
      errorTitle,
      errorUser,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <div className="container">
          <div className="control">
            {errorTitle && (
              <p className="error errorTitle">
                Please enter the title
              </p>
            )}

            {errorUser && (
              <p className="error errorUser">
                Please choose a user
              </p>
            )}

            <input
              type="text"
              className="inputTitle"
              placeholder="Enter the title"
              value={todoTitle}
              onChange={this.setTodo}
            />

            <select
              value={userName}
              className="selectUser"
              onChange={this.setUser}
            >
              <option disabled={isDisabled}>Choose a user</option>
              {users.map(({ name, id }) => (
                <option
                  key={id}
                  value={name}
                >
                  {name}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="button"
              onClick={this.addTodo}
            >
              Add
            </button>
          </div>

          <TodoList todos={visualisedTodos} />
        </div>
      </div>
    );
  }
}

export default App;
