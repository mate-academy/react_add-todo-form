import React from 'react';
import './App.css';
import todos from './api/todos';
import users from './api/users';
import { TodosList } from './TodosList';

const allTodos = todos.map(el => ({
  ...el,
  name: users.find(user => user.id === el.userId).name,
}));

class App extends React.Component {
  state = {
    title: '',
    allTodos: [...allTodos],
    user: '',
  };

  render() {
    const { user, title } = this.state;

    return (
      <div className="App">
        <h1 className="add-todo">Add todo form</h1>
        <form
          action="./api/todos"
          method="POST"

          onSubmit={(event) => {
            event.preventDefault();

            this.setState((prevState) => {
              const newTodo = {
                userId: users
                  .find(person => person.name === user).id,
                id: allTodos.length + 1,
                name: users
                  .find(person => person.name === user).name,
                title,
                completed: false,
              };

              return ({
                allTodos: [...prevState.allTodos, newTodo],
                title: '',
                user: '',
              });
            });
          }}
        >
          <div className="task-title">
            <label htmlFor="task" className="new-task">
              New task
            </label>
            <input
              id="task"
              type="text"
              name="title"
              className="fild new-fild"
              placeholder="Enter the task"
              value={this.state.title}
              onChange={(event) => {
                const { name, value } = event.target;

                this.setState({
                  [name]: value,
                });
              }}
            />
          </div>

          <div className="task-title">
            <label htmlFor="users" className="new-task">
              User
            </label>
            <select
              className="fild"
              id="users"
              name="user"
              value={this.state.user}
              onChange={(event) => {
                const { name, value } = event.target;

                this.setState({ [name]: value });
              }}
            >
              <option className="select-user">Select User</option>
              {users.map(person => (
                <option
                  key={person.id}
                  value={person.name}
                  className="select-user"
                >
                  {person.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="fild">
            Add
          </button>
        </form>
        <TodosList todos={this.state.allTodos} />
      </div>
    );
  }
}

export default App;
