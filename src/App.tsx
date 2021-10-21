import React from 'react';
import './App.css';

import initialTodos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const preparedTodos: Todo[] = initialTodos.map((todo) => {
  const user = users.find(person => person.id === todo.userId);

  return Object.assign(todo, { user });
});

type State = {
  todoTitle: string;
  todos: Todo[];
  todoUserId: number;
  titleErrorVisible: boolean,
  userErrorVisible: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: preparedTodos,
    todoTitle: '',
    todoUserId: 0,
    titleErrorVisible: false,
    userErrorVisible: false,
  };

  addTodo = () => {
    const {
      todoTitle,
      todoUserId,
    } = this.state;

    if (!todoTitle) {
      this.setState({ titleErrorVisible: true });
    }

    if (!todoUserId) {
      this.setState({ userErrorVisible: true });
    }

    if (todoUserId && todoTitle) {
      this.setState(state => {
        const newTodo: Todo = {
          userId: todoUserId,
          id: [...state.todos].sort((t1, t2) => t2.id - t1.id)[0].id + 1,
          title: todoTitle,
          completed: false,
          user: users.find(person => person.id === todoUserId),
        };

        return ({
          todos: [...state.todos, newTodo],
          todoTitle: '',
          todoUserId: 0,
        });
      });
    }
  };

  render() {
    const {
      todos,
      todoTitle,
      todoUserId,
      titleErrorVisible,
      userErrorVisible,
    } = this.state;

    return (
      <div className="App">
        <h1>
          Add todo:
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.addTodo();
          }}
          action="#"
          className="todoForm"
        >
          <div className="todoForm__errors">
            <div>
              {titleErrorVisible && (
                <span className="todoForm__error">
                  {'Please enter todo title -->'}
                </span>
              )}
            </div>
            <div>
              {userErrorVisible && (
                <span className="todoForm__error">
                  {'Please choose a user -->'}
                </span>
              )}
            </div>
          </div>
          <div className="todoForm__elements">
            <input
              className="todoForm__element"
              type="text"
              placeholder="Enter todo title"
              value={todoTitle}
              onChange={event => {
                this.setState({ todoTitle: event.target.value });
                this.setState({ titleErrorVisible: false });
              }}
            />

            <label
              htmlFor="userId"
            >
              <select
                className="todoForm__element"
                name="userId"
                id="userid"
                value={todoUserId}
                onChange={event => (
                  this.setState({
                    todoUserId: +event.target.value,
                    userErrorVisible: false,
                  }))}
              >
                <option value={0}>
                  Choose a user
                </option>

                {users.map(user => {
                  return (
                    <>
                      <option
                        value={user.id}
                        key={user.id}
                      >
                        {user.name}
                      </option>
                    </>
                  );
                })}
              </select>
            </label>
          </div>

          <button
            type="submit"
          >
            Add
          </button>
        </form>
        <h1>List of todos</h1>
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
