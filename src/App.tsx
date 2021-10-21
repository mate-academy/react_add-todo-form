import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { ToDo } from './Types/ToDo';

type State = {
  todosList: ToDo[];
  title: string;
  userId: number;
  isUserSelected: boolean;
  isTitleEmpty: boolean;
};

class App extends React.Component<{}, State> {
  state = {
    todosList: [...todos],
    title: '',
    userId: 0,
    isUserSelected: false,
    isTitleEmpty: false,
  };

  handleChange = (value: string) => {
    this.setState({ title: value });
  };

  selectorChange = (value: string) => {
    this.setState({ userId: +value });
  };

  submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    this.setState(state => {
      if (!state.userId || !state.title) {
        return {
          ...state,
          isUserSelected: !state.userId,
          isTitleEmpty: !state.title,
        };
      }

      const maxId = Math.max(...state.todosList.map(todo => todo.id));

      const newTodo: ToDo = {
        id: maxId + 1,
        userId: state.userId,
        title: state.title,
        completed: true,
      };

      return {
        title: '',
        userId: 0,
        isUserSelected: false,
        isTitleEmpty: false,
        todosList: [
          newTodo,
          ...state.todosList,
        ],
      };
    });
  };

  render() {
    const {
      title,
      todosList,
      userId,
      isTitleEmpty,
      isUserSelected,
    } = this.state;
    const preparedTodos: ToDo[] = todosList.map((todo) => {
      const user = users.find(({ id }) => id === todo.userId);

      return {
        ...todo,
        user,
      };
    });

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={this.submitForm}>
          <div>
            <input
              type="text"
              value={title}
              onChange={event => this.handleChange(event.target.value)}
              placeholder="Enter title..."
            />
            {isTitleEmpty && (
              <div className="err">
                Title cannot be empty
              </div>
            )}
          </div>
          <div>
            <select
              value={userId}
              onChange={event => this.selectorChange(event.target.value)}
            >
              <option
                value="0"
                disabled
              >
                Select user
              </option>
              {users.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {isUserSelected && (
              <div className="err">
                Select user!
              </div>
            )}
          </div>
          <button
            type="submit"
          >
            Add task
          </button>
        </form>
        <TodoList todos={preparedTodos} />
      </div>
    );
  }
}

export default App;
