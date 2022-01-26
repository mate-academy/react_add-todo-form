import React from 'react';
import './App.css';

import users from './api/users';
import todosList from './api/todos';
import { Todo } from './types/Todo';
import TodoList from './components/TodoList/TodoList';

type State = {
  todos: Todo[];
  userId: number;
  todoTitle: string;
  hasUserError: boolean;
  hasTitleError: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: todosList,
    userId: 0,
    todoTitle: '',
    hasUserError: false,
    hasTitleError: false,
  };

  handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: +e.currentTarget.value,
      hasUserError: false,
    });
  };

  handletodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.currentTarget.value;

    if (newTitle.match(/[^a-zа-я0-9 ]/i)) {
      return;
    }

    this.setState({
      todoTitle: newTitle,
      hasTitleError: false,
    });
  };

  getNewTodo = () => {
    const { userId, todoTitle, todos } = this.state;

    return ({
      userId: +userId,
      id: todos.length + 1,
      title: todoTitle,
      completed: false,
    });
  };

  addNewTodo = (todo: Todo) => {
    this.setState((state) => ({
      todos: [
        ...state.todos,
        todo,
      ],
    }));
  };

  clearState = () => {
    this.setState({
      userId: 0,
      todoTitle: '',
      hasUserError: false,
      hasTitleError: false,
    });
  };

  handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const isFormValid = this.validateForm();

    if (isFormValid) {
      const newTodo = this.getNewTodo();

      this.addNewTodo(newTodo);
      this.clearState();
    }
  };

  validateForm = () => {
    const {
      todoTitle,
      userId,
    } = this.state;

    const trimTitle = todoTitle.trim();

    if (!trimTitle || !userId) {
      this.setState({
        hasTitleError: !trimTitle,
        hasUserError: !userId,
      });

      return false;
    }

    return true;
  };

  render() {
    const {
      todos,
      todoTitle,
      userId,
      hasTitleError,
      hasUserError,
    } = this.state;

    return (
      <div className="App">
        <form
          onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            placeholder="Todo"
            value={todoTitle}
            onChange={this.handletodoChange}
          />
          {hasTitleError
            && <span>Please enter the title</span>}
          <select
            value={userId}
            onChange={this.handleUserChange}
          >
            <option value="0">
              Choose a user
            </option>
            {users.map((user) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError
            && <span>Please choose a user</span>}
          <button
            type="submit"
          >
            Add
          </button>
        </form>

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
