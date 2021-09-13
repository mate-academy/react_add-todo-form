import React from 'react';
import classNames from 'classnames';
import { TodoList } from './components/TodoList';
import './App.scss';

import users from './api/users';
import todos from './api/todos';

type State = {
  todosArr: Todo[];
  todoTitleValue: string;
  todoUserValue: string;
  invalidUser: boolean;
  invalidTitle: boolean;
};

class App extends React.Component<{}, State> {
  state = {
    todosArr: [...todos],
    todoTitleValue: '',
    todoUserValue: '',
    invalidUser: false,
    invalidTitle: false,
  };

  todoUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    this.setState({
      todoUserValue: value,
      invalidUser: false,
    });
  };

  todoTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    this.setState({
      todoTitleValue: value,
      invalidTitle: false,
    });
  };

  onSubmitAction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.todoUserValue && this.state.todoTitleValue.trim()) {
      const arr = [...this.state.todosArr].sort((a, b) => a.id - b.id);
      const newId = arr[arr.length - 1].id + 1;
      const newTodo: Todo = {
        userId: +this.state.todoUserValue,
        id: newId,
        title: this.state.todoTitleValue,
        completed: false,
      };

      this.setState((prevState) => {
        return (
          {
            todosArr: [
              ...prevState.todosArr,
              newTodo,
            ],
            todoTitleValue: '',
            todoUserValue: '',
          }
        );
      });
    } else {
      if (!this.state.todoUserValue) {
        this.setState({
          invalidUser: true,
        });
      }

      if (!this.state.todoTitleValue.trim()) {
        this.setState({
          invalidTitle: true,
        });
      }
    }
  };

  render() {
    const {
      todosArr,
      todoTitleValue,
      todoUserValue,
      invalidUser,
      invalidTitle,
    } = this.state;

    const preparedTodos: TodoItem[] = todosArr.map(todoItem => {
      const user = users.find(el => el.id === todoItem.userId) || null;
      const newTodo: TodoItem = {
        ...todoItem,
        user,
      };

      return newTodo;
    });

    return (
      <div className="App">
        <h1 className="text-center">Todo form</h1>
        <div className="todo container">
          <div className="row d-flex justify-content-center">
            <div className="col">
              <form
                action="#"
                method="POST"
                className="col d-flex justify-content-around mt-5 mb-5"
                noValidate
                onSubmit={this.onSubmitAction}
              >
                <label
                  htmlFor="todoUser"
                  className={
                    classNames(
                      'todo__user-container w-25',
                      { invalid: invalidUser },
                    )
                  }
                >
                  <select
                    className="todo__user act form-select"
                    required
                    id="todoUser"
                    name="todoUser"
                    value={todoUserValue}
                    onChange={this.todoUserChange}
                  >
                    <option value="">Choose a user</option>
                    {users.map(user => {
                      return (
                        <option key={user.id} value={user.id}>{user.name}</option>
                      );
                    })}
                  </select>
                </label>
                <label
                  htmlFor="todoTitle"
                  className={
                    classNames(
                      'todo__title-container w-25',
                      { invalid: invalidTitle },
                    )
                  }
                >
                  <input
                    className="todo__text form-control"
                    id="todoTitle"
                    type="text"
                    name="todoTitle"
                    placeholder="Write your task here"
                    required
                    value={todoTitleValue}
                    onChange={this.todoTitleChange}
                  />
                </label>
                <button type="submit" className="btn btn-primary w-25">Add todo</button>
              </form>
            </div>
          </div>
          <TodoList preparedTodos={preparedTodos} />
        </div>
      </div>
    );
  }
}

export default App;
