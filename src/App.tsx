import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';

import users from './api/users';
import todosFromServer from './api/todos';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

type State = {
  todos: Todo[];
  isFormVisible: boolean;
  todoTitle: string;
  todoUserId: number;
  todoTitleError: string;
  notChoosedUserError: string;
  successMessage: string;
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
    isFormVisible: false,
    todoTitle: '',
    todoUserId: 0,
    todoTitleError: '',
    notChoosedUserError: '',
    successMessage: '',
  };

  showForm = () => {
    this.setState({ isFormVisible: true });
  };

  resetForm = () => {
    this.setState({
      isFormVisible: false,
      todoTitle: '',
      todoUserId: 0,
      successMessage: 'Task was added',
    });
  };

  clearSuccessMessage = () => {
    this.setState({ successMessage: '' });
  };

  handleSubmit = () => {
    const { todoTitle, todoUserId } = this.state;

    if (todoTitle.trim() === '') {
      this.setState({ todoTitleError: 'Please enter the title' });

      return;
    }

    if (!todoTitle.match(/^[a-zA-Zа-яА-Я0-9 ]+$/)) {
      this.setState({
        todoTitleError: 'Invalid characters: letters (ru and en), digits and spaces are available',
      });

      return;
    }

    if (todoUserId === 0) {
      this.setState({ notChoosedUserError: 'Please choose a user' });

      return;
    }

    this.setState((state) => ({
      todos: [
        ...state.todos,
        {
          userId: state.todoUserId,
          id: this.getMaxId() + 1,
          title: state.todoTitle,
          completed: false,
          user: users.find(user => user.id === state.todoUserId),
        },
      ],
    }));
    this.resetForm();
  };

  getMaxId = () => {
    const { todos } = this.state;
    let max = todos[0].id;

    todos.forEach(todo => {
      if (todo.id > max) {
        max = todo.id;
      }
    });

    return max;
  };

  render() {
    const {
      todos,
      isFormVisible,
      todoTitle,
      todoUserId,
      todoTitleError,
      notChoosedUserError,
      successMessage,
    } = this.state;

    return (
      <div className="App">
        <div className="App__header">
          <h1 className="text-center">List of todos</h1>

          {isFormVisible
            ? (
              <form onSubmit={(event) => {
                event.preventDefault();
                this.handleSubmit();
              }}
              >
                <div className="form-group">
                  <label htmlFor="title">
                    <span>Title</span>
                    <input
                      type="text"
                      className="form-control"
                      id="title"
                      name="title"
                      value={todoTitle}
                      onChange={(event) => {
                        this.setState({
                          todoTitle: event.target.value,
                          todoTitleError: '',
                        });
                      }}
                    />
                  </label>

                  {todoTitleError && (
                    <p className="alert-danger">
                      {todoTitleError}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <select
                    className="form-select"
                    name="userId"
                    value={todoUserId}
                    onChange={(event) => {
                      this.setState({
                        todoUserId: Number(event.target.value),
                        notChoosedUserError: '',
                      });
                    }}
                  >
                    <option value={0}>
                      Choose a user
                    </option>
                    {users.map(user => (
                      <option value={user.id} key={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>

                  {notChoosedUserError && (
                    <p className="alert-danger">
                      {notChoosedUserError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-outline-primary"
                  onClick={this.showForm}
                >
                  Add todo
                </button>
              </form>
            )
            : (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={this.showForm}
              >
                Add todo
              </button>
            )}

          {successMessage && (
            <p className="alert alert-success text-center">
              {successMessage}
              <button
                type="button"
                className="close"
                onClick={this.clearSuccessMessage}
              >
                &times;
              </button>
            </p>
          )}
        </div>

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
