// import React, { useReducer } from 'react';
import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList';

const preparedTodos = todos.map(todo => ({
  ...todo,
  userName: users.find(user => (
    user.id === todo.userId
  )).name,
}));

class App extends React.Component {
  state = {
    todoTasks: [...preparedTodos],
    taskId: 2,
    user: '',
    newTodo: '',
    addButtonPressed: false,
  }

  handleChange = (event) => {
    this.buttonStateCleaner();
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  buttonStateCleaner = () => {
    this.setState({ addButtonPressed: false });
  }

  addTask = () => {
    this.setState(state => ({
      addButtonPressed: true,
    }));

    const { user, taskId, newTodo } = this.state;

    if (user && newTodo) {
      const nextTodo = {
        userId: users.find(person => person.name === user).id,
        id: taskId + 1,
        title: newTodo,
        completed: false,
        userName: users.find(person => person.name === user).name,
      };

      this.setState(state => ({
        todoTasks: [...state.todoTasks, nextTodo],
        taskId: state.taskId + 1,
        user: '',
        newTodo: '',
        addButtonPressed: false,
      }));
    }
  }

  render() {
    const { todoTasks, newTodo, addButtonPressed, user } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <section className="form-wrapper">
          <form className="form-body">

            <div className="textarea-wrapper">
              <textarea
                className="textarea"
                placeholder="put new task here"
                name="newTodo"
                value={newTodo}
                onChange={this.handleChange}
              />
              <br />
              {addButtonPressed && !newTodo
                && (<span className="text-err">enter some text</span>)}
            </div>

            <div className="select-wrapper">
              <select
                className="form-select"
                name="user"
                value={this.state.user}
                onChange={this.handleChange}
              >
                <option value="">
                  Choose User Name
                </option>

                {users.map(person => (
                  <option value={person.name} key={person.id}>
                    {person.name}
                  </option>
                ))}

              </select>
              <br />
              {addButtonPressed && !user
                && (<span className="user-err">user not chosen</span>)}
            </div>

            <div>
              <button
                className="button"
                type="button"
                onClick={this.addTask}
              >
                Add todo
              </button>
            </div>

          </form>
        </section>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <TodoList todos={todoTasks} />
      </div>
    );
  }
}

export default App;
