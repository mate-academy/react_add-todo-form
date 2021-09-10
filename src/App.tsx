import React from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const preparedTodos: Todo[] = todosFromServer.map(item => ({
  ...item,
  user: usersFromServer.find(user => user.id === item.userId) || null,
}));

const preparedUsers: User[] = usersFromServer.map(person => ({
  ...person as User,
}));

interface State {
  todos: Todo[];
  users: User[];
  userId: number;
  todoTitle: string;
  rememberUser: boolean;
  doesHaveTitle: boolean,
  doesHaveUser: boolean,
  maxTodoId: number,
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
    users: preparedUsers,
    userId: 0,
    todoTitle: '',
    rememberUser: false,
    doesHaveTitle: true,
    doesHaveUser: true,
    maxTodoId: Math.max(...preparedTodos.map(item => item.id)),
  };

  handleChange = (event: React.BaseSyntheticEvent) => {
    const {
      value,
      name,
    } = event.target;

    this.setState(prevState => ({
      ...prevState,
      [name]: name === 'userId' ? Number(value) : value,
    }));

    if (name === 'rememberUser') {
      this.setState(prevState => ({
        rememberUser: !prevState.rememberUser,
      }));
    }

    if (name === 'todoTitle') {
      this.setState(prevState => ({
        doesHaveTitle: !!prevState.todoTitle,
      }));
    }

    if (name === 'userId') {
      this.setState(prevState => ({
        doesHaveUser: !!prevState.userId,
      }));
    }
  };

  handleClick = () => {
    const {
      userId,
      todoTitle,
      rememberUser,
    } = this.state;

    if (!todoTitle || !userId) {
      this.setState({
        doesHaveTitle: !!todoTitle,
        doesHaveUser: !!userId,
      });

      return;
    }

    const todoToAdd = this.createNewTodo(userId, todoTitle);

    this.setState(prevState => ({
      userId: rememberUser ? prevState.userId : 0,
      todoTitle: '',
      doesHaveTitle: true,
      doesHaveUser: true,
      maxTodoId: prevState.maxTodoId + 1,
      todos: [
        ...prevState.todos,
        todoToAdd,
      ],
    }));
  };

  createNewTodo = (userId: number, title: string): Todo => {
    const { maxTodoId, users } = this.state;

    return {
      userId,
      id: maxTodoId + 1,
      title,
      completed: false,
      user: users.find(user => user.id === userId) || null,
    };
  };

  remeberUser = () => {
    this.setState(prevState => ({
      rememberUser: !prevState.rememberUser,
    }));
  };

  render() {
    const {
      todos,
      users,
      userId,
      todoTitle,
      rememberUser,
      doesHaveTitle,
      doesHaveUser,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <div className="form-container">
          <form className="input-form">
            <div className="input-container">
              <input
                type="text"
                name="todoTitle"
                className="input-field"
                id="todo-name"
                autoComplete="off"
                value={todoTitle}
                onChange={this.handleChange}
              />
              {doesHaveTitle || (
                <span className="alert">
                  Please enter a title
                </span>
              )}
            </div>
            <div className="input-container">
              <select
                name="userId"
                id="username"
                className="input-field"
                value={userId}
                onChange={this.handleChange}
              >
                <option disabled value="0">
                  Select a user
                </option>
                {users.map(person => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </select>
              {doesHaveUser || (
                <span className="alert">
                  Please choose a user
                </span>
              )}
            </div>
            <label htmlFor="rememeber">
              Remeber username
              <input
                type="checkbox"
                name="rememberUser"
                id="rememeber"
                checked={rememberUser}
                onChange={this.handleChange}
              />
            </label>
            <button
              type="button"
              onClick={this.handleClick}
            >
              Add a todo
            </button>
          </form>
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
