import React from 'react';
import TodoList from './TodoList';
import users from './api/users';
import todos from './api/todos';
import './App.css';

interface Todo {
  userId: number
  id: number,
  title: string,
  completed: boolean,
}

class App extends React.Component {
  state = {
    formSubmitted: false,
    todosState: [...todos],
    title: '',
    user: null,
  };

  onChange = (event: { target: { name: string; value: string; }; }) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  addTodo = () => {
    const {
      todosState,
      title,
      user,
    } = this.state;

    const todoBlank: Todo = {
      userId: (users.find(person => person.name === user)?.id) || 0,
      id: Date.now(),
      title: this.state.title,
      completed: false,
    };

    this.setState({
      formSubmitted: true,
    });

    if (user !== 'Choose a user' && user && title.length > 0) {
      this.setState({
        formSubmitted: false,
        user: null,
        title: '',
        todosState: [
          ...todosState,
          todoBlank,
        ],
      });
    }
  };

  render() {
    const {
      todosState,
      formSubmitted,
      title,
      user,
    } = this.state;

    return (
      <div className="App">

        <div className="form">

          {formSubmitted && !user && (
            <div
              className="notification"
            >
              <span>
                Please choose a user
              </span>
            </div>
          )}

          {formSubmitted && !title && (
            <div
              className="notification"
            >
              <span>
                Please enter the title
              </span>
            </div>
          )}

          <form
            onSubmit={event => {
              event.preventDefault();
              this.addTodo();
            }}
          >
            <div className="inpuField">
              <input
                type="text"
                name="title"
                className="input_todo"
                placeholder="Add new todo"
                value={this.state.title}
                onChange={this.onChange}
              />

              <select
                className="input_choice"
                name="user"
                value={!this.state.user ? '' : this.state.user}
                onChange={this.onChange}
              >
                <option>
                  Choose a user
                </option>
                {users.map(person => <option key={person.id}>{person.name}</option>)}
              </select>

              <button
                className="button"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Todo</th>
              <th>Status</th>
              <th>User Name</th>
            </tr>
          </thead>

          <tbody>
            <TodoList todoList={todosState} usersList={users} />
          </tbody>
        </table>
      </div>
    );
  }
}
export default App;
