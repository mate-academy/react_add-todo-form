import React from 'react';
import './App.scss';

import users from './api/users';
import todosFromApi from './api/todos';
import { TodoList } from './components/TodoList';

const preparedTodos: PrepearedTodo[] = todosFromApi.map(todo => ({
  ...todo,
  user: users.find(user => todo.userId === user.id) || null,
}));

type State = {
  todos: PrepearedTodo[];
  title: string;
  userId: number;
  hasTitleInputError: boolean;
  hasUserSelectError: boolean;
  hasWrongCharError: boolean;
};

class App extends React.PureComponent<{}, State> {
  state: State = {
    todos: preparedTodos,
    title: '',
    userId: 0,
    hasTitleInputError: false,
    hasUserSelectError: false,
    hasWrongCharError: false,
  };

  inputChangeNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event?.target.value,
      hasTitleInputError: false,
      hasWrongCharError: false,
    });
  };

  selectUserHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: Number(event?.target.value),
      hasUserSelectError: false,
    }, () => {
      // eslint-disable-next-line no-console
      console.log(this.state);
    });
  };

  clearForm = () => {
    this.setState({
      title: '',
      userId: 0,
    });
  };

  validateForm = () => {
    const { title, userId } = this.state;
    const titleErr = /[a-zа-яA-ZА-ЯёЁ0-9]+$/.test(title);

    if (!title || !userId || !titleErr) {
      this.setState({
        hasTitleInputError: !title,
        hasUserSelectError: !userId,
        hasWrongCharError: !titleErr,
      });

      return false;
    }

    return true;
  };

  formSubmitHandler = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { userId, title, todos } = this.state;
    const isFormValid = this.validateForm();

    if (isFormValid) {
      const ids: number[] = todos.map(todo => todo.id);

      this.setState((prevState) => ({
        todos: [...prevState.todos,
          {
            userId,
            id: Math.max(...ids) + 1,
            title,
            completed: false,
            user: users.find(user => userId === user.id) || null,
          },
        ],
      }));
      this.clearForm();
    }
  };

  render() {
    const {
      todos,
      title,
      userId,
      hasTitleInputError,
      hasUserSelectError,
      hasWrongCharError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.formSubmitHandler}>
          <div>
            <label htmlFor="title-todo" className="label">
              New Todo
              <>
                <input
                  type="text"
                  id="title-todo"
                  placeholder="Enter Todo here"
                  value={title}
                  onChange={this.inputChangeNameHandler}
                />
                {hasTitleInputError && (
                  <span>Please enter the title</span>
                )}

                {title.length > 0 && hasWrongCharError && (
                  <span>Yoy can enter only digits or letters</span>
                )}
              </>
            </label>
          </div>

          <div>
            <label htmlFor="select-user" className="label">
              Select user
              <>
                <select
                  id="select-user"
                  value={userId}
                  onChange={this.selectUserHandler}
                >
                  <option value="0">Select user</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
                {hasUserSelectError && (
                  <span>Please choose a user</span>
                )}
              </>
            </label>
          </div>

          <div>
            <button type="submit">Add Todo</button>
          </div>
        </form>
        <TodoList todos={todos} />
        <p>
          <span>Users: </span>
          {users.length}
        </p>

      </div>
    );
  }
}

export default App;
