import React from 'react';
import './App.scss';
import { TodosList } from './components/TodosList/TodosList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/todo';

type State = {
  users: User[];
  todos: Todo[];
  todoTitle: string;
  todoUserId: number;
  todoUserError: string,
  todoTitleError: string,
  maxLengthInput: number,
};

const preparedTodos = todosFromServer.map((todo) => {
  const user = usersFromServer.find(({ id }) => todo.userId === id) || null;

  return { ...todo, user };
});

class App extends React.Component<{}, State> {
  state: State = {
    users: usersFromServer,
    todos: preparedTodos,
    todoTitle: '',
    todoUserId: 0,
    todoUserError: '',
    todoTitleError: '',
    maxLengthInput: 15,
  };

  getMaxId = () => {
    const ids = this.state.todos.map(({ id }) => id) || 1;

    return Math.max(...ids);
  };

  resetForm = () => {
    this.setState({
      todoTitle: '',
      todoUserId: 0,
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {
      users,
      todoUserId,
      todoTitle,
      maxLengthInput,
    } = this.state;

    if (todoUserId === 0) {
      this.setState({ todoUserError: 'Please choose a user' });

      return;
    }

    if (todoTitle.length === 0) {
      this.setState({ todoTitleError: 'Please enter the title' });

      return;
    }

    if (todoTitle.length > maxLengthInput) {
      this.setState({ todoTitleError: `Maximum number of characters ${maxLengthInput}. You - ${todoTitle.length}` });

      return;
    }

    if (!todoTitle.match(/^[аА-яЯaA-zZ0-9]/)) {
      this.setState({
        todoTitleError: 'Invalid characters: letters (ru and en), digits and spaces are available',
      });

      return;
    }

    this.setState((state) => ({
      todos: [
        ...state.todos,
        {
          user: users.find(user => user.id === todoUserId) || null,
          userId: todoUserId,
          id: this.getMaxId() + 1,
          title: todoTitle,
          completed: false,
        },
      ],
    }));

    this.resetForm();
  };

  render() {
    const {
      todos,
      users,
      todoTitle,
      todoUserId,
      todoUserError,
      todoTitleError,
    } = this.state;

    return (
      <div className="App">
        <div className="page">
          <div className="todos">
            <div className="todos__column-left">
              <div className="todos__header">
                <h1 className="title">Todos List:</h1>
              </div>
              <TodosList todos={todos} />
            </div>
            <div className="todos__column-right">
              <form
                className="TodosForm"
                onSubmit={this.handleSubmit}
              >
                <div className="FormControl">
                  {todoUserError && (
                    <div className="FormControl__Error">{todoUserError}</div>
                  )}
                  <select
                    value={todoUserId}
                    name="user"
                    onChange={(event) => {
                      this.setState({
                        todoUserId: +event.target.value,
                        todoUserError: '',
                      });
                    }}
                  >
                    <option value="0">Choose a user</option>
                    {users.map(user => (
                      <option
                        key={user.id}
                        value={user.id}
                      >
                        {user.username}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="FormControl">
                  {todoTitleError && (
                    <div className="FormControl__Error">{todoTitleError}</div>
                  )}
                  <label
                    htmlFor="title"
                    className="Label"
                  >
                    <span className="Label__Title">Title</span>
                    <input
                      type="text"
                      name="title"
                      placeholder="task"
                      id="title"
                      value={todoTitle}
                      onChange={(event) => {
                        this.setState({
                          todoTitle: event.target.value,
                          todoTitleError: '',
                        });
                      }}
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="Button"
                >
                  Add todo
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
