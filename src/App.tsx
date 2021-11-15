import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/TodoType';
import { TodosList } from './components/TodosList';

interface State {
  title: string;
  userId: number;
  todosList: Todo[];
  isInvalidTitle: boolean;
  isInvalidUser: boolean;
}

class App extends React.Component<{}, State> {
  state = {
    title: '',
    userId: 0,
    todosList: [...todos],
    isInvalidTitle: false,
    isInvalidUser: false,
  };

  handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      title: event.target.value,
      isInvalidTitle: false,
    });
  };

  handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      userId: Number(event.target.value),
      isInvalidUser: false,
    });
  };

  addTodo = () => {
    const { title, userId, todosList } = this.state;

    const newTodo = {
      id: todosList.length + 1,
      title,
      userId,
      completed: false,
    };

    this.setState({
      todosList: [
        ...todosList,
        newTodo,
      ],
    });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { title, userId } = this.state;

    if (!title || userId === 0) {
      if (!title) {
        this.setState({
          isInvalidTitle: true,
        });
      }

      if (userId === 0) {
        this.setState({
          isInvalidUser: true,
        });
      }

      return;
    }

    this.addTodo();

    this.setState({
      title: '',
      userId: 0,
    });
  };

  render() {
    const {
      title, userId, todosList, isInvalidTitle, isInvalidUser,
    } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title" className="App__label">
            Task
            <input
              type="text"
              name="title"
              id="title"
              value={title}
              placeholder="Task to add"
              onChange={this.handleTitleChange}
            />
          </label>
          {
            isInvalidTitle && (
              'Please enter the title'
            )
          }

          <label htmlFor="userId" className="App__label">
            User:
            <select
              name="users"
              id="userId"
              value={userId}
              onChange={this.handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>

              {users.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {
            isInvalidUser && (
              'Please enter the title'
            )
          }

          <button
            type="submit"
          >
            Add task
          </button>
        </form>

        <TodosList todosList={todosList} />
      </div>
    );
  }
}

export default App;
