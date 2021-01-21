import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const todosWithUsers = todos.map(todo => ({
  ...todo,
  user: users.find(user => (todo.userId === user.id)),
}));

class App extends React.Component {
  state = {
    tasks: [...todosWithUsers],
    todo: '',
    employee: '',
    errorEmployee: '',
    errorTodo: '',
  }

  render() {
    const { tasks, todo, employee, errorEmployee, errorTodo } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <form
          method="POST"
          action="#"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label>
            {' '}
            Add a task
            <input
              type="text"
              name="todo"
              value={todo}
              placeholder="Tape a task"
              onChange={(event) => {
                const { value } = event.target;

                this.setState({
                  todo: value,
                  errorTodo: '',
                });
              }}
            />
            <span>{errorTodo}</span>

          </label>

          <br />

          <select
            value={employee}
            onChange={(event) => {
              const { value } = event.target;

              this.setState({
                employee: value,
                errorEmployee: '',
              });
            }}
          >
            <option value="">Choose an employee</option>
            {users.map(user => (
              <option
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <span>{errorEmployee}</span>
          <br />

          <button
            type="submit"
            onClick={() => {
              if (todo === '') {
                this.setState({
                  errorTodo: 'Please enter the title',
                });

                if (employee === '') {
                  this.setState({
                    errorEmployee: 'Please choose an employee',
                  });
                }

                return;
              }

              if (employee === '') {
                this.setState({
                  errorEmployee: 'Please choose an employee',
                });

                return;
              }

              this.setState({
                tasks: [...tasks,
                  {
                    id: tasks.length + 1,
                    title: todo,
                    user: users
                      .find(user => (user.name === employee)),
                  }],

                employee: '',
                todo: '',
              });
            }}
          >
            Add
          </button>
        </form>

        <TodoList tasks={[...tasks]} />
      </div>
    );
  }
}

export default App;
