import React from 'react';
import './App.css';

import users from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(person => person.id === todo.userId) || null,
}));

interface State {
  user: string;
  title: string;
  todoList: Todo[];
  isUserEmpty: boolean;
  isTitleEmpty: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    user: '',
    title: '',
    todoList: preparedTodos,
    isUserEmpty: false,
    isTitleEmpty: false,
  };

  handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value.replace(/[^ a-zA-Zа-яА-я0-9]/g, ''),
      isTitleEmpty: false,
    });
  };

  selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      user: event.target.value,
      isUserEmpty: false,
    });
  };

  addTodo = () => {
    const { todoList, title, user } = this.state;

    const currentUser: User | null = users.find(
      (userFromServer) => userFromServer.name === user,
    ) || null;

    if (!currentUser) {
      return;
    }

    const newTodo: Todo = {
      user: currentUser,
      userId: currentUser.id,
      id: todoList[todoList.length - 1].id + 1,
      title,
      completed: false,
    };

    this.setState((state) => ({
      todoList: [...state.todoList, newTodo],
    }));
  };

  validateSubmit = () => {
    const { title, user } = this.state;

    this.setState({
      isTitleEmpty: title === '',
      isUserEmpty: user === '',
    });

    return title && user;
  };

  clearForm = () => {
    this.setState({
      user: '',
      title: '',
    });
  };

  render() {
    const {
      user, title, todoList, isUserEmpty, isTitleEmpty,
    } = this.state;

    return (
      <div className="App">
        <div className="todos text-center">
          <h1 className="mb-5">Add todo form</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              this.validateSubmit();
              this.addTodo();
              this.clearForm();
            }}
            className="form-inline"
          >

            <div className="mb-5">
              <label htmlFor="newTask">
                Add a new task:
                <input
                  className="form-control"
                  type="text"
                  name="newTask"
                  id="newTask"
                  value={title}
                  onChange={this.handleTitle}
                  placeholder="Enter new task here"
                  required
                />
              </label>
              {isTitleEmpty && (
                <span className="alert">Please enter the title!</span>
              )}
            </div>

            <div className="mb-5">
              <select
                className="form-select ml-1"
                onChange={this.selectUser}
                value={user}
                required
              >
                <option value={0}>Choose a user</option>
                {users.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              {isUserEmpty && (
                <span className="alert">Please choose a user!</span>
              )}
            </div>

            <div>
              <button type="submit" className="btn btn-primary mb-5 ml-1">
                Add
              </button>
            </div>

          </form>
          <TodoList todos={todoList} />
        </div>
      </div>
    );
  }
}

export default App;
