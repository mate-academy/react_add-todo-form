import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { User } from './types/user';
import { Todo } from './types/todo';

import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map(todo => {
  const todoForUser = {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };

  return todoForUser;
});

type State = {
  title: string,
  userName: string,
  todo: Todo[],
  selectWarn: boolean,
  inputWarn: boolean,
};

class App extends React.PureComponent<{}, State> {
  state: State = {
    title: '',
    userName: '',
    todo: [...preparedTodos],
    selectWarn: false,
    inputWarn: false,
  };

  handleTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      inputWarn: false,
    });
  };

  confirmSubmit = () => {
    const { title, userName } = this.state;

    this.setState({
      selectWarn: userName === '',
      inputWarn: title === '',
    });

    return userName && title;
  };

  setUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      userName: value,
      selectWarn: false,
    });
  };

  addTodo = () => {
    const currentUser: User | null = users.find(
      user => (user.name === this.state.userName),
    ) || null;

    if (currentUser === null) {
      return;
    }

    const createTodo: Todo = {
      userId: currentUser.id,
      title: this.state.title,
      id: this.state.todo.length,
      user: currentUser,
      completed: false,
    };

    this.setState((state) => ({
      todo: [...state.todo, createTodo],
    }));
  };

  clearForm = () => {
    this.setState({
      title: '',
      userName: '',
    });
  };

  handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    if (!this.confirmSubmit()) {
      return;
    }

    this.addTodo();
    this.clearForm();
  };

  handleChecked = (id: number) => {
    const newTodo = this.state.todo.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    this.setState(() => ({
      todo: newTodo,
    }));
  };

  render() {
    const { inputWarn, selectWarn, todo } = this.state;

    return (
      <div>
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
                placeholder="Please write task"
                required
              />
              {inputWarn && (
                <div className="warning">
                  Please enter the title
                </div>
              )}
              <select
                name="user"
                id="userSelect"
                className="todo-select"
                value={this.state.userName}
                onChange={this.setUser}
              >
                <option value="" selected disabled>Please select user</option>
                {users.map(user => (
                  <option value={user.name}>{user.name}</option>
                ))}
              </select>
              {selectWarn && (<div className="warning">Select user</div>)}
            </div>
            <button
              type="submit"
              className="button__add"
            >
              Add
            </button>

          </form>
          <div>
            <TodoList
              todos={todo}
              handleChecked={this.handleChecked}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
