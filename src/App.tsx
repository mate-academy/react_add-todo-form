import React from 'react';
import './App.css';

import users from './api/users';
import { todos as initialTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

interface State {
  todos: Todo[],
  taskTitile: string,
  selectedUser: string,
  isUserNotSelected: boolean,
  isTitleNotEntered: boolean,
}

export class App extends React.Component {
  state = {
    todos: initialTodos,
    taskTitile: '',
    selectedUser: '',
    isUserNotSelected: false,
    isTitleNotEntered: false,
  };

  recordTaskTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskTitile: event.target.value,
    });
  };

  selectUser = (event: any) => (this.setState({
    selectedUser: event.target.value,
  }));

  showError = () => {
    if (!this.state.selectedUser) {
      this.setState((state: State) => ({
        isUserNotSelected: !state.isUserNotSelected,
      }));
    }

    if (!this.state.taskTitile) {
      this.setState((state: State) => ({
        isTitleNotEntered: !state.isTitleNotEntered,
      }));
    }
  };

  // React.SyntheticEvent
  addTodo = (event: any) => {
    event.preventDefault();

    if (this.state.selectedUser && this.state.taskTitile) {
      this.setState((state: State) => {
        const newTodo = {
          userId: users.find(user => user.name === state.selectedUser)?.id,
          id: state.todos.length + 1,
          title: state.taskTitile,
          completed: false,
        };

        return ({
          todos: [...state.todos, newTodo],
          taskTitile: '',
          selectedUser: '',
        });
      });
    } else {
      this.showError();
    }

    // eslint-disable-next-line no-console
    console.log(this.state);
  };

  render(): React.ReactNode {
    return (
      <div className="App">
        <h1 className="App__title">
          Todo list
        </h1>

        <form
          action="post"
          onSubmit={this.addTodo}
          className="App__add-todo-form add-todo"
        >
          <input
            type="text"
            name="taskTitile"
            placeholder="Enter a task title"
            value={this.state.taskTitile}
            onChange={this.recordTaskTitle}
            className="add-todo__input"
          />

          <select
            name="todoForUser"
            value={this.state.selectedUser}
            className="add-todo__user-select"
            onChange={this.selectUser}
          >
            <option
              value=""
              disabled
            >
              Select user
            </option>

            {users.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {this.state.isUserNotSelected && (
            <span
              className="add-todo__error"
            >
              Test text
            </span>
          )}

          <button
            type="submit"
            className="add-todo__submit"
          >
            Add
          </button>
        </form>

        <TodoList readyTodos={this.state.todos} />
      </div>
    );
  }
}

export default App;
