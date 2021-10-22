import React from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { Todo, User } from './Types';

const preparedTodos: Todo[] = todos.map((todo) => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

class App extends React.Component {
  state = {
    todos: [...preparedTodos],
    newTodo: '',
    newTodoUserName: '',
    newTodoError: false,
    newTodoUserNameError: false,
  };

  handleChange = (event: React.FormEvent< HTMLSelectElement | HTMLInputElement>) => {
    event.preventDefault();
    this.setState({ [event.currentTarget.name]: event.currentTarget.value });
  };

  addNewTodo = (event:React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const { todos, newTodo, newTodoUserName } = this.state;

    if (newTodo === '' || newTodoUserName === '') {
      if (!newTodo) {
        this.setState({ newTodoError: true });
      } else {
        this.setState({ newTodoError: false });
      }

      if (!newTodoUserName) {
        this.setState({ newTodoUserNameError: true });
      } else {
        this.setState({ newTodoUserNameError: false });
      }

      return;
    }

    const newTodos = [
      ...todos,
      {
        userId: (users.find((user) => user.name === newTodoUserName) as User).id || null,
        id: todos[todos.length - 1].id + 1,
        title: newTodo,
        completed: false,
        user: users.find((user) => user.name === newTodoUserName),
      },
    ];

    this.setState({
      todos: [...newTodos],
      newTodo: '',
      newTodoUserName: '',
      newTodoError: false,
      newTodoUserNameError: false,
    });
  };

  render() {
    return (
      <div className="App">
        <div className="todo">
          <div className="todo__header todo__item">
            <div className="name">name</div>
            <div className="name">email</div>
            <div className="name">task</div>
            <div className="name">status</div>
          </div>
          <form
            className="form"
            onSubmit={(event) => {
              event.preventDefault();
              event.currentTarget.reset();
            }}
          >
            <div className="field-elem">
              <input
                type="text"
                name="newTodo"
                placeholder="Type your todo here"
                value={this.state.newTodo}
                onChange={this.handleChange}
                required
              />
              {this.state.newTodoError
                && (
                  <div className="error-box">
                    something wrong with your todo
                  </div>
                )}
            </div>
            <div className="field-elem">
              <select
                name="newTodoUserName"
                className="form--select"
                value={this.state.newTodoUserName}
                id=""
                onChange={this.handleChange}
                required
              >
                <option value="">Choose a user</option>
                {users.map((user) => <option value={user.name}>{user.name}</option>)}
              </select>
              {this.state.newTodoUserNameError
                && (
                  <div className="error-box">
                    something wrong with your name
                  </div>
                )}
            </div>
            <button type="submit" onClick={this.addNewTodo}>add</button>
          </form>
          <TodoList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
