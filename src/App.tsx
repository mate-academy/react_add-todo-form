import React from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import TodoType from './types/TodoType';
import todos from './api/todos';
import users from './api/users';

type State = {
  todosTask: TodoType[];
  name: string;
  title: string;
  error: string;
};

export class App extends React.Component<{}, State> {
  state = {
    todosTask: [...todos],
    name: '',
    title: '',
    error: 'Please enter valid value!',
  };

  addTodo = () => {
    const { name, title } = this.state;

    if (
      users.some(user => name === user.name) && title
    ) {
      this.setState((state) => {
        const currTitle = state.title;
        const currUserId = state.todosTask[state.todosTask.length - 1].id + 1;
        const currUserIndex = users.findIndex((user) => state.name === user.name);
        const newTodo = {
          id: currUserId,
          title: currTitle,
          userId: users[currUserIndex].id,
        };

        return {
          todosTask: [...state.todosTask, newTodo],
        };
      });
    }
  };

  render() {
    const {
      todosTask,
      title,
      name,
      error,
    } = this.state;

    return (
      <div className="app">
        <div className="app__container">
          <h1>ToDO List</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              this.addTodo();
            }}
          >
            <div className="field-error">
              <div>
                <select
                  name="users"
                  className="field-user"
                  value={name}
                  onChange={(event) => this.setState({
                    name: event.target.value,
                  })}
                >
                  <option>Choose name</option>
                  {users.map(user => {
                    return (
                      <option>
                        {user.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                {error && error}
              </div>
            </div>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Enter text of todo"
                  className="field-task"
                  value={title}
                  onChange={(event) => {
                    this.setState({
                      title: event.target.value,
                    });
                  }}
                />
              </div>
              <div className="field-error">
                {error && error}
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="field-add"
              >
                Add
              </button>
            </div>
          </form>
          <p>
            <TodoList todosTask={todosTask} />
          </p>
        </div>
      </div>

    );
  }
}

export default App;
