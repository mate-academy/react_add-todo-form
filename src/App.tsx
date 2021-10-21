import React from 'react';
import './App.scss';
import classnames from 'classnames';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User, Todo } from './types/TodoType';
import { TodoList } from './components/TodoList';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todosAndUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

type State = {
  todos: Todo[];
  newTodoTitle: string;
  newUserId: number;
  hasIdError: boolean;
  hasTitleError: boolean;
};

class App extends React.Component<{}, State> {
  state = {
    todos: todosAndUsers,
    hasIdError: false,
    newUserId: 0,
    hasTitleError: false,
    newTodoTitle: '',
  };

  handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(prevState => {
      if (!prevState.newTodoTitle || !prevState.newUserId) {
        return {
          ...prevState,
          hasTitleError: !prevState.newTodoTitle,
          hasIdError: !prevState.newUserId,
        };
      }

      const maxId = Math.max(...prevState.todos.map(todo => todo.id));

      const newTodo: Todo = {
        id: maxId + 1,
        title: prevState.newTodoTitle,
        userId: prevState.newUserId,
        user: getUserById(prevState.newUserId),
      };

      return {
        hasTitleError: false,
        newTodoTitle: '',
        hasIdError: false,
        newUserId: 0,
        todos: [
          newTodo,
          ...prevState.todos,
        ],
      };
    });
  };

  handleTitleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    this.setState({
      newTodoTitle: event.target.value,
      hasTitleError: false,
    });
  };

  handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      newUserId: +event.target.value,
      hasIdError: false,
    });
  };

  render() {
    const {
      todos,
      newTodoTitle,
      newUserId,
      hasTitleError,
      hasIdError,
    } = this.state;

    return (
      <div className="App">
        <h1> Add todo form </h1>

        <div className="app__body">
          <form
            onSubmit={this.handleFormSubmit}
            className="form"
          >
            <div>
              <input
                className={classnames({
                  'field-error': hasTitleError,
                })}
                type="text"
                placeholder="Todo title"
                value={newTodoTitle}
                onChange={this.handleTitleChange}
              />
              {hasTitleError && (
                <span className="error">
                  Enter a title, please
                </span>
              )}
            </div>

            <div>
              <label htmlFor="#select">
                <select
                  id="select"
                  value={newUserId}
                  onChange={this.handleUserIdChange}
                  className={classnames({
                    'field-error': hasIdError,
                  })}
                >
                  <option value="0"> Choose a user </option>
                  {usersFromServer.map(user => (
                    <option value={user.id} key={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </label>

              {hasIdError && (
                <span className="error">
                  Select a user, please
                </span>
              )}
            </div>

            <button type="submit">Add todo</button>
          </form>

          <TodoList tasks={todos} />
        </div>
      </div>
    );
  }
}

export default App;
