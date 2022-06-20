/* eslint-disable no-console */
import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const todosWithUser = todos.map(todo => {
  return {
    ...todo,
    userName: users.find(user => user.id === todo.userId)?.name,
  };
});

type Todo = {
  id: number;
  title: string;
};

type State = {
  todoTitle: string;
  user: number;
  todos: Todo[];
};

const TodoItem = (props: Todo) => {
  return (
    <>
      <label htmlFor={props.id.toString()}>
        <input
          id={props.id.toString()}
          type="checkbox"
          defaultChecked
        />
        {props.title}
      </label>
      <br />
    </>
  );
};

class App extends React.Component<{}, State> {
  state: State = {
    todoTitle: '',
    user: 0,
    todos: [...todosWithUser],
  };

  // #region create and submit todo
  createTodo = () => {
    this.setState(state => {
      const newTodo = {
        userName: users.find(user => user.id === this.state.user)?.name,
        id: state.todos.length + 1,
        title: this.state.todoTitle,
        completed: false,
      };

      return {
        todoTitle: '',
        user: 0,
        todos: [
          ...state.todos,
          newTodo,
        ],
      };
    });
  };

  submit = (event: React.FormEvent) => {
    event.preventDefault();

    return this.state.todoTitle && this.state.user
      ? this.createTodo()
      : null;
  };
  // #endregion create and submit todo

  render() {
    return (
      <>
        <div className="App">
          <h1>Add todo form</h1>

          <form onSubmit={this.submit}>
            <div>
              <input
                name="todoTitle"
                type="text"
                placeholder="new todo"
                pattern="[a-zA-ZА-Яа-яЁё \d]+"
                title="please use only latin/russian alphabet, spaces and digits"
                value={this.state.todoTitle}
                onChange={(event) => {
                  this.setState({
                    todoTitle: event.target.value,
                  });
                }}
              />
            </div>

            <div>
              <select
                name="user"
                value={this.state.user}
                onChange={(event) => {
                  this.setState({
                    user: +event.target.value,
                  });
                }}
              >
                <option value="">
                  Choose a user
                </option>
                {users.map(oneUser => (
                  <option
                    key={oneUser.id}
                    value={oneUser.id}
                  >
                    {oneUser.name}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit">
              Add
            </button>
          </form>

        </div>

        <strong>Todos:</strong>
        <br />

        {this.state.todos.map(todo => (
          <TodoItem
            id={todo.id}
            title={todo.title}
          />
        ))}

        <h4>{`Todos count: ${this.state.todos.length}`}</h4>
        <pre>
          {JSON.stringify(
            this.state,
            null,
            2,
          )}
        </pre>

      </>
    );
  }
}

export default App;
