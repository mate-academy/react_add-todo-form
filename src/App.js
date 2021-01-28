import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList/TodoList';

const todosWithUser = todos.map(todo => ({
  ...todo,
  userName: users.find(user => (todo.userId === user.id)).name,
}));

class App extends React.Component {
  state = {
    tasks: todosWithUser,
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

  getUser = finder => users.find(user => (user.name === finder));

  addTodo = (task, empl) => {
    if (task === '') {
      this.setState(state => ({
        todo: {
          ...state.todo,
          error: 'Please enter the title',
        },
      }));
    }

    if (empl === '') {
      this.setState(state => ({
        employee: {
          ...state.employee,
          error: 'Please choose an employee',
        },
      }));
    }

    if (task === '' || empl === '') {
      return;
    }

    this.setState(state => ({
      tasks: [...state.tasks,
        {
          id: state.tasks.length + 1,
          title: state.todo.title,
          completed: false,
          userId: this.getUser(empl).id,
          userName: this.getUser(empl).name,
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
  }

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
            this.addTodo(todo.title, employee.title);
          }}
        >
          <label>
            <span>Add a task</span>
            <br />
            <input
              type="text"
              name="todo"
              value={todo.title}
              placeholder="Tape a task"
              maxLength="50"
              onChange={this.handleChange}
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
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          <span className="error">{employee.error}</span>
          <br />
          <br />

          <button type="submit">
            Add
          </button>
        </form>

        <TodoList tasks={tasks} />
      </div>
    );
  }
}

export default App;
