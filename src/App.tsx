import React from 'react';
import './styles/App.scss';

import users from './api/users';
import todos from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';

import { TodoList } from './components/TodoList/TodoList';

const preparedTodos = todos.map((todo) => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

type State = {
  todoList: Todo[];
  taskInfo: string;
  user: string;
  isTaskInfoProvided: boolean;
  isUserSelected: boolean;
};

class App extends React.Component<{}, State> {
  state = {
    todoList: preparedTodos,
    taskInfo: '',
    user: '',
    isTaskInfoProvided: false,
    isUserSelected: false,
  };

  handleTaskInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      taskInfo: event.target.value,
      isTaskInfoProvided: false,
    });
  };

  handleSelectField = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      user: event.target.value,
      isUserSelected: false,
    });
  };

  addTodo = () => {
    const { todoList, taskInfo, user } = this.state;

    const currentUser: User | null = users.find(
      (userFromServer) => userFromServer.name === user,
    ) || null;

    if (!currentUser) {
      return;
    }

    const newTodo: Todo = {
      user: currentUser,
      userId: currentUser.id,
      id: todoList.length + 1,
      title: taskInfo,
      completed: false,
    };

    this.setState((state) => ({
      todoList: [...state.todoList, newTodo],
    }));

    this.clearForm();
  };

  validateSubmit = () => {
    const { taskInfo, user } = this.state;

    this.setState({
      isTaskInfoProvided: taskInfo === '',
      isUserSelected: user === '',
    });

    return taskInfo && user;
  };

  clearForm = () => {
    this.setState({
      taskInfo: '',
      user: '',
    });
  };

  render() {
    const {
      todoList, taskInfo, user, isTaskInfoProvided, isUserSelected,
    } = this.state;

    return (
      <div className="App">
        <form
          className=" App__AddTodo AddTodo"
          onSubmit={(event) => {
            event.preventDefault();

            this.validateSubmit();
            this.addTodo();
            this.clearForm();
          }}
        >
          <div className="AddTodo__taskInfo">
            <label htmlFor="title" className="AddTodo__taskLabel">
              Task to do:

              <input
                type="text"
                name="taskInfo"
                id="title"
                value={taskInfo}
                placeholder="Task deatils"
                className="AddTodo__field"
                onChange={this.handleTaskInput}
              />
            </label>

            {isTaskInfoProvided && (
              <p className="AddTodo__error">Please, provide task deatils</p>
            )}
          </div>

          <div className="AddTodo__userInfo">
            <label htmlFor="userSelect" className="AddTodo__userLabel">
              Choose a user:

              <select
                name="user"
                id="userSelect"
                value={user}
                className="AddTodo__field"
                onChange={this.handleSelectField}
              >
                <option value="" disabled={user !== ''}>
                  Select a user
                </option>
                {users.map(({ id, name }) => (
                  <option key={id} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </label>

            {isUserSelected && (
              <p className="AddTodo__error">Please, select a user</p>
            )}
          </div>

          <button
            type="submit"
            className="AddTodo__button"
            onSubmit={this.addTodo}
          >
            Add task
          </button>
        </form>
        <TodoList todos={todoList} />
      </div>
    );
  }
}

export default App;
