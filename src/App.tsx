import React from 'react';
import classNames from 'classnames';
import styles from './App.scss';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todos from './api/todos';

const cx = classNames.bind(styles);

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
    errorTitle: true,
    errorUser: true,
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

  setUser = (event: any) => {
    this.setState({
      userName: event.target.value,
      isDisabled: true,
      errorUser: true,
    });
  };

  setTodo = (event: any) => {
    this.setState({
      todoTitle: event.target.value.replace(/[^0-9a-zа-яё\s]/gi, ''),
      errorTitle: true,
    });
  };

  addTodo = () => {
    const {
      visualisedTodos,
      userName,
      todoTitle,
    } = this.state;

    this.setState({
      errorTitle: !!todoTitle,
      errorUser: !!userName,
    });

    if (userName && todoTitle) {
      const userId: any = users.find(({ name }) => name === userName)?.id;

      const todosId: any = visualisedTodos.map(({ id }) => +id);

      const newTodo: Todo = {
        userId: +userId,
        id: Math.max(...todosId) + 1,
        title: todoTitle,
        completed: false,
        user: users.find(user => user.id === userId),
      };

      const updateTodos: any = [...visualisedTodos];

      updateTodos.push(newTodo);

      this.setState({
        visualisedTodos: updateTodos,
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

    const classNameErrorTitle = cx({
      error: true,
      errorTitle: true,
      hiden: errorTitle,
    });

    const classNameErrorUser = cx({
      error: true,
      errorUser: true,
      hiden: errorUser,
    });

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <div className="container">
          <div className="control">
            <p className={classNameErrorTitle}>
              Please enter the title
            </p>

            <p className={classNameErrorUser}>
              Please choose a user
            </p>

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
              {users.map(({ name }) => (
                <option value={name}>{name}</option>
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
