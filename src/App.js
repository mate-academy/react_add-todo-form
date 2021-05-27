import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';

import todosApi from './api/todos';
import usersApi from './api/users';

const findUser = userId => usersApi.find(user => user.id === userId);

const preparedTodos = todosApi.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

class App extends React.Component {
  state = {
    todos: preparedTodos,
    newTodoTitle: '',
    newUserId: 0,
    hasTodoTitleErr: false,
    hasUserSelectErr: false,
  }

  addTodo = (todoTitle, userId) => {
    const { todos } = this.state;

    const newTodo = {
      userId,
      id: todos[todos.length - 1].id + 1,
      title: todoTitle,
      completed: false,
      user: findUser(userId),
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { newTodoTitle, newUserId } = this.state;

    this.setState(state => ({
      hasTodoTitleErr: !state.newTodoTitle,
      hasUserSelectErr: !state.newUserId,
    }));

    if (!newTodoTitle) {
      return;
    }

    if (!newUserId) {
      return;
    }

    this.addTodo(newTodoTitle, +newUserId);

    this.setState({
      newTodoTitle: '',
      newUserId: 0,
    });
  }

  render() {
    const {
      todos,
      newTodoTitle,
      newUserId,
      hasTodoTitleErr,
      hasUserSelectErr,
    } = this.state;

    return (
      <div className="App">
        <form
          className="addTodoForm"
          onSubmit={this.handleSubmit}
        >
          <span className="addTodoFormTitle">Add Todos</span>
          <div className="titleInputWrapper">
            {hasTodoTitleErr && (
              <span className="error">
                *You need to add todo task first
              </span>
            )}
            <input
              className="titleInput"
              name="title"
              type="text"
              placeholder="Write todo task here"
              autoComplete="off"
              value={newTodoTitle}
              onChange={(event) => {
                this.setState({
                  newTodoTitle: event.target.value,
                  hasTodoTitleErr: false,
                });
              }}
            />
          </div>

          <div className="selectUserWrapper">
            {hasUserSelectErr && (
              <span className="error">
                *You need to select executant to this task
              </span>
            )}
            <select
              name="user"
              className="selectUser"
              value={newUserId}
              onChange={(event) => {
                this.setState({
                  newUserId: +event.target.value,
                  hasUserSelectErr: false,
                });
              }}
            >
              <option value="">Choose user</option>
              {usersApi.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="todoAddBtn">Add TODO</button>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
