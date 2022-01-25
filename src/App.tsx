import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

type State = {
  preparedTodos: Todo[],
  title: string,
  userName: string,
  titleError: boolean,
  userNameError: boolean,
};

class App extends React.Component<{}, State> {
  maxId = Math.max(...todos.map(todo => todo.id));

  state: State = {
    preparedTodos: todos.map(todo => ({
      ...todo,
      userName: users.find(user => user.id === todo.userId)?.name || '',
    })),
    title: '',
    userName: '',
    titleError: false,
    userNameError: false,
  };

  changeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    this.setState({
      titleError: false,
      userNameError: false,
      [name]: value,
    } as Pick<State, 'title' | 'userName' | 'titleError' | 'userNameError'>);
  };

  addTodo = (event: React.FormEvent) => {
    event.preventDefault();
    this.maxId += 1;

    this.setState(({
      preparedTodos,
      title,
      userName,
    }) => {
      const titleError = !title.trim();
      const userNameError = !userName;

      if (titleError || userNameError) {
        return {
          preparedTodos,
          title: title.trim(),
          userName,
          titleError,
          userNameError,
        };
      }

      return {
        preparedTodos: [
          ...preparedTodos,
          {
            title,
            userName,
            id: this.maxId,
          },
        ],
        title: '',
        userName: '',
        titleError: false,
        userNameError: false,
      };
    });
  };

  render() {
    const {
      preparedTodos,
      title,
      userName,
      titleError,
      userNameError,
    } = this.state;

    return (
      <div className="App">
        <h1 className="title has-text-link">Add todo</h1>
        <div className="App_content">
          <TodoList todos={preparedTodos} />
          <form
            action="#"
            onSubmit={this.addTodo}
            className="box App_form"
          >
            <input
              type="text"
              name="title"
              placeholder="Add a title"
              value={title}
              onChange={this.changeHandler}
              className="input is-link"
            />

            {titleError && (<span className="has-text-danger">Please, add a title</span>)}

            <div className="select is-link is-fullwidth App_form-element">
              <select
                name="userName"
                value={userName}
                onChange={this.changeHandler}
              >
                <option value="">
                  Choose a user
                </option>

                {users.map(user => (
                  <option key={user.id} value={user.name}>{user.name}</option>
                ))}
              </select>
            </div>

            {userNameError && (<span className="has-text-danger">Please, choose a user</span>)}

            <button
              type="submit"
              className="button is-link is-fullwidth App_form-element"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
