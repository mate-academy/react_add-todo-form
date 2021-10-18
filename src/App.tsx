import React from 'react';

import usersFromAPI from './api/users';
import todosFromAPI from './api/todos';

import Todo from './types/Todo';

import 'bulma/css/bulma.min.css';
import { TodoList } from './components/TodoList';

const initialTodos: Todo[] = todosFromAPI.map(todo => {
  const user = usersFromAPI.find(({ id }) => id === todo.userId);

  return {
    ...todo,
    user,
  } as Todo;
});

interface State {
  todos: Todo[];
  userId: number;
  title: string;
  hasErrorOccured: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: initialTodos,
    userId: 0,
    title: '',
    hasErrorOccured: false,
  };

  setUser: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    this.setState({ userId: +e.currentTarget.value });
  };

  setTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (this.validateCharacter(e.currentTarget.value)) {
      this.setState({ title: e.currentTarget.value });
    }
  };

  setTodo: React.FormEventHandler = (e): void => {
    const { userId, title, todos } = this.state;

    if (!userId || !title.trim()) {
      this.setState({ hasErrorOccured: true });
    } else {
      const id = todos.length + 1;
      const user = usersFromAPI.find(usr => userId === usr.id);

      const newTodo = {
        id,
        title: title.trim(),
        user,
        completed: false,
      } as Todo;

      if (user) {
        this.setState({ todos: [...todos, newTodo] });
      }

      this.resetTodo();
    }

    e.preventDefault();
  };

  resetTodo = () => {
    this.setState({
      hasErrorOccured: false,
      title: '',
      userId: 0,
    });
  };

  validateCharacter = (c: string) => {
    const lastCharCode = c.toLowerCase().charCodeAt(c.length - 1);

    const englishChars = lastCharCode >= 97 && lastCharCode <= 122;
    const russianChars = lastCharCode >= 1072 && lastCharCode <= 1103;
    const numbers = lastCharCode >= 48 && lastCharCode <= 57;
    const space = lastCharCode === 32;
    const emptyChar = c === '';

    return englishChars || russianChars || numbers || space || emptyChar;
  };

  render() {
    const {
      todos,
      title,
      userId,
      hasErrorOccured: isErrorOccured,
    } = this.state;

    return (
      <div className="App container">
        <h1 className="title">Add todo form</h1>
        <form onSubmit={this.setTodo} action="#" className="box">
          <div className="field">
            <label htmlFor="title" className="label">
              Title
              <div className="control">

                <input
                  className="input"
                  type="text"
                  id="title"
                  placeholder="Enter todo title"
                  value={title}
                  onChange={this.setTitle}
                />

              </div>
              {isErrorOccured && !title.trim() && (
                <p className="help is-danger">This title is invalid</p>
              )}
            </label>
          </div>

          <label htmlFor="user" className="label">
            User
            <div className="field has-addons">
              <div className="control is-expanded">
                <div className="select is-fullwidth">
                  <select
                    name="user"
                    id="user"
                    onChange={this.setUser}
                    value={userId}
                  >
                    <option value="">Choose a user</option>
                    {usersFromAPI.map(({ id, name }) => (
                      <option key={id} value={id}>{name}</option>
                    ))}
                  </select>

                </div>
                {isErrorOccured && !userId && (
                  <p className="help is-danger">Please choose a user</p>
                )}
              </div>
              <div className="control">
                <button type="submit" className="button is-primary">Add</button>
              </div>
            </div>
          </label>
        </form>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
