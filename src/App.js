import React from 'react';
import './App.css';
import { Todolist } from './components/ToDoList';
import users from './api/users';
import todoss from './api/todos';

const preparedTodos = todoss.map((todo) => {
  const user = users.find(person => todo.userId === person.id);

  return {
    ...todo,
    user,
  };
});

class App extends React.Component {
  state = {
    todos: preparedTodos,
    newTitle: '',
    selectedUserId: 0,
    errorSelect: false,
    errorTodo: false,
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { todos, newTitle, selectedUserId } = this.state;

    this.setState({
      errorSelect: !selectedUserId,
      errorTodo: !newTitle,
    });

    if (!selectedUserId) {
      return;
    }

    if (!newTitle) {
      return;
    }

    this.createTodo(todos, newTitle, selectedUserId);
  }

  clearForm = () => {
    this.setState({
      newTitle: '',
      selectedUserId: 0,
    });
  }

  createTodo(todos, todoTitle, selectedUser) {
    const newTodo = {
      userId: selectedUser,
      user: users.find(person => +selectedUser === person.id),
      id: todos[todos.length - 1].id + 1,
      title: todoTitle,
    };

    this.setState({
      todos: [...todos, newTodo],
    });

    this.clearForm();
  }

  render() {
    const { todos,
      newTitle,
      selectedUserId,
      errorSelect,
      errorTodo } = this.state;

    return (
      <div className="App d-flex justify-content-between">
        <h1>Add Todo</h1>
        <form
          className="d-flex flex-column gap-3"
          onSubmit={this.handleFormSubmit}
        >
          <button
            type="submit"
            className="btn btn-outline-primary"
          >
            Add
          </button>

          <div>
            <input
              className="position-relative
                d-inline-block
                form-control"
              type="text"
              name="todo"
              placeholder="Todo"
              value={newTitle}
              onChange={(event) => {
                this.setState({
                  newTitle: event.target.value,
                });
              }}
            />
            {errorTodo && newTitle === ''
              ? <span className="position-absolute">Please select user</span>
              : null
            }
          </div>

          <div>
            <select
              className="form-select d-inline-block position-relative"
              name="user"
              value={selectedUserId}
              onChange={(event) => {
                this.setState({ selectedUserId: Number(event.target.value) });
              }}
            >
              <option value="0">Choose user</option>

              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}

            </select>

            {errorSelect && selectedUserId === 0
              ? <span className="position-absolute">Please select user</span>
              : null
            }
          </div>

        </form>

        <Todolist todos={todos} />
      </div>
    );
  }
}

export default App;
