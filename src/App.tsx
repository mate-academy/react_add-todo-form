import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './component';

interface State {
  title: string,
  userName: string,
  chooseUser: string,
  chooseTitle: string,
  todoList: Todo[],
}

const todosList: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

export default class App extends React.Component<{}, State> {
  state: State = {
    title: '',
    userName: '',
    chooseUser: '',
    chooseTitle: '',
    todoList: [...todosList],
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({ title: value, chooseTitle: '' });
  };

  handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({ userName: value, chooseUser: '' });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  handleSerch = () => {
    const { userName, title } = this.state;
    const person: User | null = users.find(user => user.name === this.state.userName) || null;
    const newId = this.state.todoList.length + 1;

    if (userName.trim().length === 0 || person === null) {
      this.setState({ chooseUser: 'Please choose a user' });

      return;
    }

    if (title.trim().length === 0) {
      this.setState({ chooseTitle: 'Please choose a title' });

      return;
    }

    const newTodo: Todo = {
      id: newId,
      user: person,
      userId: person.id,
      completed: false,
      title: this.state.title,
    };

    this.setState((state) => ({
      todoList: [...state.todoList, newTodo],
      chooseTitle: '',
      chooseUser: '',
      userName: '',
      title: '',
    }));
  };

  render() {
    const { todoList, chooseUser, chooseTitle } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="query"
            className="input"
            value={this.state.title}
            placeholder="input title"
            onChange={this.handleChange}
          />

          <select
            name="person"
            className="list"
            value={this.state.userName}
            onChange={this.handleSelect}
          >
            <option>Choose user</option>
            {users.map(user => (
              <option key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <button type="submit" onClick={this.handleSerch}>
            Add
          </button>
          <div>
            {chooseUser}
            {chooseTitle}
          </div>
          <TodoList todos={todoList} />
        </form>
      </div>
    );
  }
}
