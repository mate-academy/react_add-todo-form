import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

interface State {
  title: string,
  userId: number,
  todosFromServer: Todo[],
  errorTitle: boolean,
  errorUser: boolean,
}

type Todo = {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    title: '',
    userId: 0,
    todosFromServer: todos,
    errorTitle: false,
    errorUser: false,
  };

  addTodo = () => {
    const newTodo = {
      userId: this.state.userId,
      id: todos.length + 1,
      title: this.state.title,
      completed: false,
    };

    if (newTodo.title.length === 0) {
      this.setState({
        errorTitle: true,
      });
    }

    if (newTodo.userId === 0) {
      this.setState({
        errorUser: true,
      });

      return;
    }

    this.setState(prevState => ({
      todosFromServer: [
        ...prevState.todosFromServer,
        newTodo,
      ],
      title: '',
    }));
  };

  validationOfTitle = (input: string) => {
    const symbols = '±!@#$%^&*()_+}{~<>?/.,"№:;';
    const array = input.split('');
    const result = array.filter(item => !symbols.includes(item));

    return result.join('');
  };

  render(): React.ReactNode {
    return (
      <div className="App">
        <h1 className="main__title">create new todo!</h1>
        <form action="/" className="form">
          <div
            className="error"
            style={{
              visibility: !this.state.errorTitle ? 'hidden' : 'visible',
            }}
          >
            Please enter the title!
          </div>
          <div
            className="error error__user"
            style={{
              visibility: !this.state.errorUser ? 'hidden' : 'visible',
            }}
          >
            Please choose a user!
          </div>
          <div className="input__container">
            title:
            <input
              className="input__field"
              type="text"
              name="title"
              value={this.state.title}
              onChange={(event) => {
                this.setState({
                  title: this.validationOfTitle(event.target.value),
                  errorTitle: false,
                });
              }}
            />
          </div>
          <label
            htmlFor="select-user"
            className="input__lable"
          >
            <div className="input__container">
              select user:
              <select
                className="input__field"
                name="user"
                id="select-user"
                value={this.state.userId}
                onChange={(event) => {
                  this.setState({
                    userId: +event.target.value,
                    errorUser: false,
                  });
                }}
              >
                <option value={0}>
                  Choose a user
                </option>
                {users.map(user => {
                  return (
                    <>
                      <option value={user.id}>
                        {user.name}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
          </label>
          <div className="input__container button__container">
            <button
              type="button"
              className="submit__button input__field"
              onClick={this.addTodo}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default App;
