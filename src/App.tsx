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
    userNotif: false,
    todoNotif: false,
    todosState: [...todos],
    inputTodo: '',
    choiceOfWorker: 'Choose a user',
    todoId: todos[todos.length - 1].id + 1,
    idOfUser: 0,
  };

  onChange = (event: { target: { name: string; value: string; }; }) => {
    const { name, value } = event.target;
    const { idOfUser, todoNotif, userNotif } = this.state;

    // eslint-disable-next-line no-console
    console.log(event.target);

    this.setState({
      [name]: value,

      idOfUser: name === 'choiceOfWorker'
        ? users.find(user => user.name === value)?.id
        : idOfUser,

      userNotif: (userNotif && event.target.name === 'inputTodo'),
      todoNotif: (todoNotif && event.target.name === 'choiceOfWorker'),
    });
  };

  addTodo = () => {
    const {
      todoId, inputTodo, idOfUser, choiceOfWorker,
    } = this.state;

    const todoBlank: Todo = {
      userId: idOfUser,
      id: todoId,
      title: inputTodo,
      completed: false,
    };

    this.setState({
      userNotif: (choiceOfWorker === 'Choose a user'),
      todoNotif: (inputTodo.length === 0),

      choiceOfWorker: (inputTodo.length > 0 && choiceOfWorker !== 'Choose a user')
        ? 'Choose a user'
        : choiceOfWorker,

      inputTodo: (inputTodo.length > 0 && choiceOfWorker !== 'Choose a user')
        ? ''
        : inputTodo,
    });

    if (choiceOfWorker !== 'Choose a user' && inputTodo.length > 0) {
      const { todosState } = this.state;

      this.setState({
        todoId: todoId + 1,
        todosState: [
          ...todosState,
          todoBlank,
        ],
      });
    }
  };

  render() {
    const { todosState } = this.state;

    return (
      <div className="App">

        <div className="form">

          {this.state.userNotif && (
            <div
              className="notification"
            >
              <span>
                Please choose a user
              </span>
            </div>
          )}

          {this.state.todoNotif && (
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
            }}
          >
            <div className="inpuField">
              <input
                type="text"
                name="inputTodo"
                className="input_todo"
                placeholder="Add new todo"
                value={this.state.inputTodo}
                onChange={this.onChange}
              />

              <select
                className="input_choice"
                name="choiceOfWorker"
                value={this.state.choiceOfWorker}
                onChange={this.onChange}
              >
                <option>
                  Choose a user
                </option>
                {users.map(user => <option key={user.id}>{user.name}</option>)}
              </select>

              <button
                className="bottom"
                type="button"
                onClick={this.addTodo}
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
