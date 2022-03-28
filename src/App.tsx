import React from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import todos from './api/todos';
import users from './api/users';

const preparedTodos = todos.map(todo => {
  return {
    ...todo,
    user: users.find(person => person.id === todo.userId) || null,
  };
});

type Props = {};
type State = {
  title: string,
  userName: string,
  id: number,
  todosArr: Todo[],
  isTitleError: boolean,
  isSelectError: boolean,
};

class App extends React.Component<Props, State> {
  state = {
    title: '',
    userName: '',
    id: todos.length + 1,
    todosArr: [...preparedTodos],
    isTitleError: false,
    isSelectError: false,
  };

  preparedTodos = () => {
    this.state.todosArr.map(todo => {
      return {
        ...todo,
        user: users.find(person => person.id === todo.userId) || null,
      };
    });
  };

  createTodos = (newTitle: string, newUserName: string) => {
    this.setState((state) => ({ id: state.id + 1 }));

    if (newTitle) {
      this.setState(state => ({ title: state.title.trim() }));
    }

    if (!newTitle || !newUserName) {
      this.setState({
        isTitleError: !newTitle,
        isSelectError: !newUserName,
      });
    } else {
      const newTodo = {
        userId: users.find(person => person.name === newUserName)?.id,
        title: newTitle,
        id: this.state.id,
        completed: false,
        user: users.find(person => person.name === newUserName) || null,
      };

      this.setState((state) => ({
        todosArr: [
          ...state.todosArr,
          newTodo,
        ],
        title: '',
        userName: '',
      }));
    }
  };

  render() {
    const {
      title,
      userName,
      isSelectError,
      isTitleError,
    } = this.state;

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <form
          className="App__form"
          onSubmit={(event) => {
            event.preventDefault();
            this.createTodos(title, userName);
          }}
        >
          <input
            className="App__form-item"
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(event) => {
              this.setState({ title: event.target.value, isTitleError: false });
            }}
          />

          {isTitleError && (
            <span className="App__error">
              {' '}
              Please enter the title
            </span>
          )}

          <select
            className="App__form-item"
            name={userName}
            value={userName}
            onChange={(event) => {
              this.setState({ userName: event.target.value, isSelectError: false });
            }}
          >
            <option value="">
              Choose a user
            </option>

            {users.map(user => {
              return (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              );
            })}
          </select>

          {isSelectError && (
            <span className="App__error">
              {' '}
              Please choose a user
            </span>
          )}

          <button
            className="App__form-button"
            type="submit"
          >
            Add
          </button>

        </form>
        <div>
          <TodoList todos={this.state.todosArr} />
        </div>
      </div>
    );
  }
}

export default App;
