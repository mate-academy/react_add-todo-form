/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import './App.scss';
import classnames from 'classnames';
import todos from './api/todos';
import users from './api/users';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: Todo[] = todos.map(todoItem => ({
  ...todoItem,
  user: users.find(user => user.id === todoItem.userId),
}));

type State = {
  title: string,
  user: string,
  tods: Todo[],
  isTitle: boolean,
  isUser: boolean,
};

class App extends React.Component<{}, State> {
  state = {
    title: '',
    user: '',
    tods: [...preparedTodos],
    isTitle: false,
    isUser: false,
  };

  handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      isTitle: false,
    });
  };

  handleNameSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      user: event.target.value,
      isUser: false,
    });
  };

  formSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    const { title, user, tods } = this.state;

    if (!title.trim()) {
      this.setState({ isTitle: true });

      return;
    }

    if (!user) {
      this.setState({ isUser: true });

      return;
    }

    const preparedTodo: Todo = {
      title,
      completed: false,
      user: users.find(usr => usr.name === user),
      id: tods[tods.length - 1].id + 1,
      userId: 0,
    };

    this.setState((prev) => {
      return {
        tods: [...prev.tods, preparedTodo],
        title: '',
        user: '',
      };
    });
  };

  render() {
    const {
      title, tods, isTitle, isUser,
    } = this.state;

    return (
      <div className="App">
        <h1 className="title">Add Todo:</h1>
        <form
          className="Form"
          onSubmit={this.formSubmit}
        >
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            placeholder="what to do?"
            id="title"
            value={title}
            onChange={this.handleChangeTitle}
          />
          <div className={classnames(isTitle ? 'warning' : 'hide')}>Please enter the title</div>
          <label htmlFor="user">User:</label>
          <select
            name="user"
            id="user"
            onChange={this.handleNameSelect}
          >
            {users.map((usez) => <option value={usez.name} key={usez.id}>{usez.name}</option>)}
            <option value="" selected={this.state.user === ''}>Choose a user</option>
          </select>
          <div className={classnames(isUser ? 'warning' : 'hide')}>Please choose a user</div>
          <button type="submit">Add</button>
        </form>
        <TodoList todos={tods} />
      </div>
    );
  }
}

export default App;
