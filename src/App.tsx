import React from 'react';
import { TodoList } from './components/TodoList';

import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

const findUserById = (userId: number) => {
  return users.find((user) => user.id === userId) || null;
};

const todosWithUser: Todo[] = todos.map((todo) => ({
  ...todo,
  user: findUserById(todo.userId),
}));

const maxId: number = Math.max(...todosWithUser.reduce((acc: number[], curr: Todo) => {
  return [...acc, curr.id];
}, []));

interface State {
  currentId: number;
  title: string;
  selectedUserId: number;
  todoList: Todo[];
  isUserChoosed: boolean;
  isTodoInclude: boolean;
}

export class App extends React.Component<{}, State> {
  state: State = {
    currentId: maxId,
    title: '',
    selectedUserId: 0,
    todoList: todosWithUser,
    isUserChoosed: false,
    isTodoInclude: false,
  };

  handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    this.setState({
      selectedUserId: +event.target.value,
      isUserChoosed: false,
    });
  };

  handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    this.setState({
      title: event.target.value,
      isTodoInclude: false,
    });
  };

  addTodo = (event: React.FormEvent) => {
    event.preventDefault();
    if (this.state.selectedUserId === 0 || this.state.title.trim().length === 0) {
      this.setState(state => ({
        isUserChoosed: !state.selectedUserId,
        isTodoInclude: !state.title.trim().length,
      }));

      return;
    }

    const newTodo = {
      userId: this.state.selectedUserId,
      id: this.state.currentId + 1,
      title: this.state.title,
      completed: false,
      user: findUserById(this.state.selectedUserId),
    };

    this.setState(state => {
      return {
        currentId: state.currentId + 1,
        title: '',
        selectedUserId: 0,
        todoList: [...state.todoList, newTodo],
      };
    });
  };

  render() {
    const { title, selectedUserId, todoList } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.addTodo} className="form-group d-grid gap-3">
          <label htmlFor="add" className="form-check-label">
            <input
              className="form-control"
              type="text"
              id="add"
              placeholder="Todo title"
              value={title}
              onChange={this.handleChangeInput}
            />
          </label>
          {this.state.isTodoInclude && (
            <p className="alert-sm text-danger">
              Please enter the title
            </p>
          )}
          <select
            className="form-select"
            value={selectedUserId}
            onChange={this.handleChangeSelect}
          >
            <option value="0">Choose a user</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {this.state.isUserChoosed && (
            <p className="alert-sm text-danger">
              Please choose a user
            </p>
          )}
          <button
            type="submit"
            className="btn btn-primary"
          >
            Add ToDo
          </button>
        </form>
        <TodoList
          todos={todoList}
        />
      </div>
    );
  }
}

export default App;
