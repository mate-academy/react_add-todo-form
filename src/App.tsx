import React from 'react';
import './App.css';

import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import todosServer from './api/todos';
import { User } from './types/user';
import { Todo } from './types/todo';

const preparedTodos = todosServer.map(todo => {
  const todoForUser = {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };

  return todoForUser;
});

type State = {
  todos: Todo[];
  title: string;
  userName: string;
  selectWarning: boolean;
  inputWarning: boolean;
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    title: '',
    userName: '',
    selectWarning: false,
    inputWarning: false,
  };

  setUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userName: value,
      selectWarning: false,
    });
  };

  handleTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      inputWarning: false,
    });
  };

  addTodo = () => {
    const currentUser:User | null = users.find(
      user => (user.name === this.state.userName),
    ) || null;

    if (currentUser === null) {
      return;
    }

    const createdTodo: Todo = {
      userId: currentUser.id,
      title: this.state.title,
      id: this.state.todos.length + 1,
      user: currentUser,
      completed: false,
    };

    this.setState((state) => ({
      todos: [...state.todos, createdTodo],
    }));
  };

  clearForm = () => {
    this.setState({
      title: '',
      userName: '',
    });
  };

  validateSumbit = () => {
    const { title, userName } = this.state;

    this.setState({
      selectWarning: userName === '',
      inputWarning: title === '',
    });

    return title && userName;
  };

  handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!this.validateSumbit()) {
      return;
    }

    this.addTodo();
    this.clearForm();
  };

  handleChecked = (id:number) => {
    const newTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.setState(() => ({
      todos: newTodos,
    }));
  };

  render() {
    const { todos, selectWarning, inputWarning } = this.state;

    return (
      <div className="App">
        <form
          action="get"
          className="form-todo"
          onSubmit={this.handleSubmit}
        >
          <div className="form-inputs">
            <input
              type="text"
              value={this.state.title}
              className="todo-input"
              onChange={this.handleTodoTitle}
            />
            {inputWarning && (
              <div className="warning">
                Please enter the title
              </div>
            )}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="userSelect">
              <select
                name="user"
                id="userSelect"
                className="todo-select"
                value={this.state.userName}
                onChange={this.setUser}
              >
                <option value="">Please choose a user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.name}>{user.name}</option>
                ))}
              </select>
            </label>
            {selectWarning && (<div className="warning">Please choose a user</div>)}
          </div>
          <button
            type="submit"
            className="button-addTodo"
          >
            Add
          </button>
        </form>
        <div>
          <TodoList
            preparedTodos={todos}
            handleChecked={this.handleChecked}
          />
        </div>
      </div>
    );
  }
}

export default App;
