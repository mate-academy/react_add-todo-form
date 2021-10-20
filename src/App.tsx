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
  preparedTodos: Todo[],
  employee: number,
  task: string,
  errorEployee: boolean,
  errorTask: boolean,
};

class App extends React.Component<{}, State> {
  state: State = {
    preparedTodos: prepareTodos(),
    employee: 0,
    task: '',
    errorEployee: false,
    errorTask: false,
  };

  fakeSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    this.setState(prevState => {
      if (!prevState.employee || !prevState.task) {
        return {
          ...prevState,
          errorEployee: true,
          errorTask: true,
        };
      }

      const maxId = Math.max(...prevState.preparedTodos.map(todo => todo.id));

      todosCopy.push({
        id: maxId + 1,
        title: prevState.task,
        userId: prevState.employee,
        completed: false,
      });

      return {
        employee: 0,
        task: '',
        errorEployee: false,
        errorTask: false,
        preparedTodos: prepareTodos(),
      };
    });
  };

  employeeValueChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      employee: +event.target.value,
      errorEployee: false,
    });
  };

  taskValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
          onSubmit={this.fakeSubmit}
        >
          <p>
            Give some tasks for employees
          </p>

          <select
            name="employee"
            id="employee"
            value={this.state.employee}
            onChange={this.employeeValueChange}
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
            {this.state.errorEployee && 'You need to pick somebody!'}
          </p>

          <input
            type="text"
            name="task"
            id="task"
            placeholder="Give task to a lazy employee"
            value={this.state.task}
            onChange={this.taskValueChange}
          />

          <p className="error">
            {this.state.errorEployee && 'You need to give task!'}
          </p>

          <button type="submit">
            Add task
          </button>
        </form>
        <TodoList todos={this.state.preparedTodos} />
      </div>
    );
  }
}

export default App;
