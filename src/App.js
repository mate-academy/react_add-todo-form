import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

class App extends React.Component {
  state = {
    tasks: [...todos],
    todo: {
      title: '',
      error: '',
    },
    employee: {
      title: '',
      error: '',
    },
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: {
        title: value,
        error: '',
      },
    });
  };

  render() {
    const { tasks, todo, employee } = this.state;

    return (
      <div className="App">
        <h1 className="App__title">Add todo form</h1>

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
            <span>Add a task</span>
            <br />
            <input
              type="text"
              name="todo"
              value={todo.title}
              placeholder="Tape a task"
              maxLength="50"
              onChange={
                this.handleChange
              }
            />
            <span className="error">{todo.error}</span>
          </label>

          <br />
          <br />

          <select
            name="employee"
            value={employee.title}
            onChange={
              this.handleChange
            }
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
          <span className="error">{employee.error}</span>
          <br />
          <br />

          <button
            type="submit"
            onClick={() => {
              if (todo.title === '') {
                this.setState(state => ({
                  todo: {
                    ...state.todo,
                    error: 'Please enter the title',
                  },
                }));
              }

              if (employee.title === '') {
                this.setState(state => ({
                  employee: {
                    ...state.employee,
                    error: 'Please choose an employee',
                  },
                }));
              }

              if (todo.title === '' || employee.title === '') {
                return;
              }

              this.setState(state => ({
                tasks: [...tasks,
                  {
                    id: tasks.length + 1,
                    title: todo.title,
                    completed: false,
                    userId: users.find(user => user.name === employee.title).id,
                  }],

                employee: {
                  ...state.employee,
                  title: '',
                },

                todo: {
                  ...state.todo,
                  title: '',
                },
              }));
            }}
          >
            Add
          </button>
        </form>

        <TodoList tasks={[...tasks].map(task => ({ ...task }))} />
      </div>
    );
  }
}

export default App;
