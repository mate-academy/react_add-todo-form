import React from 'react';
import './App.scss';
import classNames from 'classnames';

import usersFromApi from './api/users';
import todosFromApi from './api/todos';

interface User {
  id: number,
  name: string,
}

interface Todo {
  userId: number,
  id: number,
  title: string,
  completed: boolean,
  user: User,
}

const preparedTodos: Todo[] = todosFromApi.map(todo => {
  const findedUser = usersFromApi.find(user => todo.userId === user.id);

  return {
    ...todo,
    user: findedUser,
  } as Todo;
});

interface State {
  todos: Todo[]
  userId: number,
  title: string
  userError: boolean,
  titleError: boolean,
}

class App extends React.Component<{}, State> {
  state = {
    todos: [...preparedTodos],
    userId: 0,
    title: '',
    userError: false,
    titleError: false,
  };

  setTodo: React.FormEventHandler = (event): void => {
    const { userId, title, todos } = this.state;

    if (!userId) {
      this.setState({ userError: true });
    } else {
      this.setState({ userError: false });
    }

    if (!title) {
      this.setState({ titleError: true });
    } else {
      this.setState({ titleError: false });
    }

    if (title && userId) {
      const newTodo = {
        userId,
        id: todos.length + 1,
        title,
        completed: false,
        user: usersFromApi.find(user => user.id === this.state.userId),
      } as Todo;

      this.setState({
        todos: [...todos, newTodo],
        userId: 0,
        title: '',
        userError: false,
        titleError: false,
      });
    }

    event.preventDefault();
  };

  render() {
    const {
      todos,
      userId,
      title,
      titleError,
      userError,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={this.setTodo} className="todo-form">
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(event) => {
              this.setState({ title: event.target.value });
            }}
          />
          {titleError && (
            <p>This title is invalid</p>
          )}
          <select
            name="user"
            value={userId}
            onChange={(event) => {
              this.setState({ userId: +event.target.value });
            }}
          >
            <option value="">Choose a user</option>
            {usersFromApi.map(user => {
              return (
                <option key={user.id} value={user.id}>{user.name}</option>
              );
            })}
          </select>
          {userError && (
            <p>Choose a user</p>
          )}
          <button type="submit">Add</button>
        </form>
        <ul className="todo-list">
          {todos.map(todo => {
            return (
              <li
                key={todo.id}
                className={classNames(
                  'todo-list__item',
                  {
                    'todo-list__item--done': todo.completed,
                  },
                )}
              >
                <p>
                  {`Name: ${todo.user.name}`}
                  {' '}
                </p>
                <p>{todo.title}</p>
                <p>{todo.completed ? 'Done' : 'In progress'}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
