import React from 'react';
import './App.scss';
import todos from './api/todos';
import users from './api/users';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

const todosCopy = todos.map(todo => ({ ...todo }));
const prepareTodos = () => {
  return todosCopy.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId),
  }));
};

type State = {
  todos: Todo[],
  employeeId: number,
  task: string,
  errorEmployee: boolean,
  errorTask: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    todos: prepareTodos(),
    employeeId: 0,
    task: '',
    errorEmployee: false,
    errorTask: false,
  };

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.setState(prevState => {
      if (prevState.employeeId === 0) {
        return {
          ...prevState,
          errorEmployee: true,
        };
      }

      if (!prevState.task) {
        return {
          ...prevState,
          errorTask: true,
        };
      }

      if (!prevState.employeeId && !prevState.task) {
        return {
          ...prevState,
          errorEmployee: true,
          errorTask: true,
        };
      }

      const maxId = Math.max(...prevState.todos.map(todo => todo.id));

      todosCopy.push({
        id: maxId + 1,
        title: prevState.task,
        userId: prevState.employeeId,
        completed: false,
      });

      return {
        employeeId: 0,
        task: '',
        errorEmployee: false,
        errorTask: false,
        todos: prepareTodos(),
      };
    });
  };

  handleEmployeeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      employeeId: +event.target.value,
      errorEmployee: false,
    });
  };

  handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      task: event.target.value,
      errorTask: false,
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Boss simulator</h1>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <p>
            Give some tasks for employees
          </p>

          <select
            name="employee"
            id="employee"
            value={this.state.employeeId}
            onChange={this.handleEmployeeChange}
          >
            <option
              value="0"
              disabled
            >
              Choose lazy employee
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

          <p className="error">
            {this.state.errorEmployee && 'You need to pick somebody!'}
          </p>

          <input
            type="text"
            name="task"
            id="task"
            placeholder="Give task to a lazy employee"
            value={this.state.task}
            onChange={this.handleTaskChange}
          />

          <p className="error">
            {this.state.errorTask && 'You need to give task!'}
          </p>

          <button type="submit">
            Add task
          </button>
        </form>
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
