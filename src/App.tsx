/* eslint-disable react/no-unused-state */
import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';

import { TodoList } from './components/TodoList';
import { Todo } from './types';

const preparedTodos: Todo[] = todos.map((todo) => {
  return {
    ...todo, // old properties
    user: users.find(user => user.id === todo.userId) || null, // + user or null
  };
});

interface State {
  todos: Todo[];
  newTodoTitle: string;
  userId: number;
  // isUserSelected: boolean;
  // isNewTodoProvided: boolean;
}

export class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
    newTodoTitle: '',
    userId: 1,
    // isUserSelected: false,
    // isNewTodoProvided: false,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.preventDefault();
    const text = event.target.value;

    this.setState({
      newTodoTitle: text,
    });

    // eslint-disable-next-line no-console
    console.log(this.state.newTodoTitle);

    // if (text) {
    //   this.setState({
    //     isNewTodoProvided: true,
    //   });
    // }
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // event.preventDefault();
    const userId = +event.target.value;

    this.setState({
      userId,
    });

    // if (text) {
    //   this.setState({
    //     isUserSelected: true,
    //   });
    // }
  };

  handleSubmit = () => {
    // event.preventDefault();

    // const currentUser = users.find(user => this.state.user === user.name) || null;

    // if (currentUser) {
    //   const newTodoID = this.state.todos; // ????
    // }

    const { userId, newTodoTitle } = this.state;

    if (!newTodoTitle) {
      return;
    }

    const nextID = Math.max(...todos.map(todo => todo.id)) + 1;

    const currentUser = users.find(user => user.id === userId);

    const newTodo: Todo = {
      id: nextID,
      userId,
      title: newTodoTitle,
      completed: false,
      user: currentUser,
    };

    this.setState((state) => ({
      todos: [
        ...state.todos,
        newTodo,
      ],
      newTodoTitle: '',
      userId: 1,
    }));

    // eslint-disable-next-line no-console
    console.log(this.state);
  };

  render() {
    return (
      <div className="App">
        <>
          <h1>
            Add todo form
          </h1>
          <form name="newTodo">
            <input
              type="text"
              name="newTodoTitle"
              onChange={this.handleTitleChange}
              value={this.state.newTodoTitle}
            />
          </form>
          <select
            name=""
            onChange={this.handleUserChange}
          >
            {users.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
            {/* <option
              value=""
            >
              Choose user
            </option> */}
          </select>
          <button
            type="submit"
            // onSubmit={this.handleSubmit}
            onClick={this.handleSubmit}
          >
            Add
          </button>
          <p>
            <span>Users: </span>
            <TodoList preparedTodos={this.state.todos} />
          </p>
        </>
      </div>
    );
  }
}

export default App;
