import React from 'react';
import './App.scss';

import users from './api/users';
import todos from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const preparedTodos = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

type State = {
  todoList: Todo[],
  selectedUser: string,
  enteredTodo: string,
  isUserSelected: boolean,
  isTodoEntered: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    todoList: preparedTodos,
    selectedUser: '',
    enteredTodo: '',
    isUserSelected: true,
    isTodoEntered: true,
  };

  handleChange = (event: {
    target: {
      name: string;
      value: string;
    };
  }): void => {
    const {
      name,
      value,
    } = event.target;

    this.setState(state => ({
      ...state,
      [name]: value,
    }));

    if (name === 'enteredTodo') {
      this.setState({
        isTodoEntered: true,
      });
    }

    if (name === 'selectedUser') {
      this.setState({
        isUserSelected: true,
      });
    }
  };

  checkBoxChange = (event: {
    target: {
      id: string;
      type: string;
      checked: boolean;
    };
  }): void => {
    const {
      id,
      checked,
    } = event.target;

    const { todoList } = this.state;
    const newTodoList = [...todoList];

    const targetTodo = newTodoList.find(
      (todo) => todo.id === Number(id),
    );

    if (targetTodo) {
      targetTodo.completed = checked;
    }

    this.setState({
      todoList: newTodoList,
    });
  };

  addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {
      todoList,
      enteredTodo,
      selectedUser,
    } = this.state;

    if (!enteredTodo || !selectedUser) {
      return (
        this.setState(state => ({
          isTodoEntered: state.enteredTodo !== '',
          isUserSelected: state.selectedUser !== '',
        }))
      );
    }

    const chosenUser = users.find(user => user.name === selectedUser);

    const newTodo: Todo = {
      userId: chosenUser?.id,
      id: todoList.length + 1,
      title: enteredTodo,
      user: chosenUser || null,
      completed: false,
    };

    return this.setState(state => ({
      todoList: [...state.todoList, newTodo],
      enteredTodo: '',
      selectedUser: '',
    }));
  };

  removeTodo = (id: number) => {
    const { todoList } = this.state;

    this.setState({
      todoList: todoList.filter((todo) => {
        return todo.id !== id;
      }),
    });
  };

  render() {
    const {
      todoList,
      enteredTodo,
      selectedUser,
      isTodoEntered,
      isUserSelected,
    } = this.state;

    return (
      <div className="app">
        <h1 className="app__title">Todos</h1>
        <TodoList
          todos={todoList}
          onRemove={this.removeTodo}
          checkBoxChange={this.checkBoxChange}
        />
        <h1 className="app__title">Add todo</h1>
        <form
          className="app__form"
          onSubmit={this.addTodo}
        >
          <div>
            <select
              className="app__form-item"
              name="selectedUser"
              value={selectedUser}
              onChange={this.handleChange}
            >
              <option value="">
                Choose a user
              </option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {!isUserSelected && (
              <div className="app__error-message">
                *Please select a user
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              className="app__form-item"
              value={enteredTodo}
              name="enteredTodo"
              id="todo"
              placeholder="Enter new todo"
              onChange={this.handleChange}
            />
            {!isTodoEntered && (
              <div className="app__error-message">
                *Please enter new todo
              </div>
            )}
          </div>
          <button
            type="submit"
            className="app__button"
          >
            Add
          </button>
        </form>
      </div>
    );
  }
}

export default App;
