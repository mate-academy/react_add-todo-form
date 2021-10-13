import React from 'react';

import usersAPI from './api/users';
import todosAPI from './api/todos';

import Todo from './types/Todo';

import 'bulma/css/bulma.min.css';
import { TodoList } from './components/TodoList';

const initialTodos: Todo[] = todosAPI.map(todo => {
  const user = usersAPI.find(({ id }) => id === todo.userId);

  return {
    ...todo,
    user,
  } as Todo;
});

interface State {
  todos: Todo[];
  userId: number;
  title: string;
  isErrorOccured: boolean;
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: initialTodos,
    userId: 0,
    title: '',
    isErrorOccured: false,
  };

  setUser: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    this.setState({ userId: +e.currentTarget.value });
  };

  setTitle: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (this.validateCharacter(e.currentTarget.value) || e.currentTarget.value === '') {
      this.setState({ title: e.currentTarget.value });
    }
  };

  setTodo: React.FormEventHandler = (e): void => {
    const { userId, title, todos } = this.state;

    if (!userId || !title.trim()) {
      this.setState({ isErrorOccured: true });
    } else {
      const id = todos[todos.length - 1].id + 1;
      const user = usersAPI.find(usr => userId === usr.id);

      const newTodo = {
        id,
        title,
        user,
        completed: true,
      } as Todo;

      if (user) {
        this.setState({ todos: [newTodo, ...todos] });
      }

      this.resetTodo();
    }

    e.preventDefault();
  };

  resetTodo = () => {
    this.setState({
      isErrorOccured: false,
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

    return englishChars || russianChars || numbers || space;
  };

  render() {
    const {
      todos,
      title,
      userId,
      isErrorOccured,
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
                    {usersAPI.map(({ id, name }) => (
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
