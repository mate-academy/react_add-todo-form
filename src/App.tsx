import React from 'react';
import './App.css';

import users from './api/users';
import { todos as initialTodos } from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

interface State {
  todos: Todo[],
  taskTitle: string,
  selectedUser: string,
  taskTitleError: boolean,
  selectedUserError: boolean,
}

export class App extends React.Component {
  state = {
    todos: initialTodos,
    taskTitle: '',
    selectedUser: '',
    taskTitleError: null,
    selectedUserError: null,
  };

  saveTaskTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskTitle: event.target.value,
      taskTitleError: null,
    });
  };

  saveSelectedUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUser: event.target.value,
      selectedUserError: null,
    });
  };

  addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState((state: State) => ({
      taskTitleError: state.taskTitle ? null : 'Plese, enter a task title!',
      selectedUserError: state.selectedUser ? null : 'Please, select a user!',
    }));

    // The problem could be in state and it's conditon at the moment

    if (!this.state.taskTitleError && !this.state.selectedUserError) {
      this.setState((state: State) => {
        const newTodo = {
          userId: users.find(user => user.name === state.selectedUser)?.id,
          id: state.todos.length + 1,
          title: state.taskTitle,
          completed: false,
        };

        return ({
          todos: [...state.todos, newTodo],
          taskTitile: '',
          selectedUser: '',
        });
      });
    }
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
            value={this.state.taskTitle}
            onChange={this.saveTaskTitle}
            className="add-todo__input"
          />
          {this.state.taskTitleError}

          <select
            name="todoForUser"
            value={this.state.selectedUser}
            className="add-todo__user-select"
            onChange={this.saveSelectedUser}
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
          {this.state.selectedUserError}

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
