/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { TodoList } from './components/TodoList/TodoList';

import { User } from './types/User';
import { TodoPrepared } from './types/TodoPrepared';

import './App.css';

import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => {
  const user = users.find(person => person.id === todo.userId);

  return {
    user: user || null,
    ...todo,
  };
});

type State = {
  users: User[],
  todos: TodoPrepared[],
  todoTitle: string,
  selectedUserId: number,
};

class App extends React.Component<{}, State> {
  state: State = {
    users: [...users],
    todos: [...preparedTodos],
    todoTitle: '',
    selectedUserId: 0,
  };

  handleAddTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      todoTitle: event.target.value,
    });
    // eslint-disable-next-line
    console.log(this.state.todoTitle);
  };

  handleSelecte = (event :React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedUserId: Number(event.target.value),
    });
    // eslint-disable-next-line
    console.log(this.state.selectedUserId);
  };

  handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    // this.setState((state) => ({
    //   todos: [
    //     ...state.todos,
    //     {
    //       id: state.todos.length + 1,
    //       title: state.todoTitle,
    //       userId: state.selectedUserId,
    //     },
    //   ],
    // }));
    // eslint-disable-next-line
    console.log(event.target);
    event.preventDefault();
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">
            Enter todo title:
          </label>

          <input
            id="title"
            type="text"
            name="title"
            placeholder="Todo title"
            onChange={this.handleAddTitle}
          />

          <label htmlFor="users">
            Select user:
          </label>

          <select
            name="users"
            id="users"
            onChange={this.handleSelecte}
          >
            <option value="0" key="0">
              Choose user
            </option>
            {
              this.state.users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>

          <button type="submit">
            Add
          </button>
        </form>
        <TodoList todoList={this.state.todos} />
      </>
    );
  }
}

export default App;
