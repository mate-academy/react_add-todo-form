import React from 'react';
import './App.css';
import users from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';

class App extends React.Component {
  state = {
    todos: todosFromServer,
    todoTitle: '',
    selectedUserId: '',
    isTitle: '',
    isUser: '',
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    const limitedValue = value.slice(0, 16);

    this.setState({
      [name]: limitedValue,
    });
  }

  todoTitleIntoArray() {
    const { todos, todoTitle, selectedUserId } = this.state;

    if (todoTitle && selectedUserId) {
      const addedTodo = {
        id: todos.length + 1,
        title: todoTitle,
        userId: selectedUserId,
      };

      this.setState({
        todos: [...todos, addedTodo],
      });

      this.setState({
        todoTitle: '',
        selectedUserId: '',
        isTitle: false,
        isUser: false,
      });
    }

    if (!todoTitle) {
      this.setState({
        isTitle: true,
      });
    }

    if (!selectedUserId) {
      this.setState({
        isUser: true,
      });
    }
  }

  render() {
    const { todos, todoTitle, selectedUserId, isTitle, isUser } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <form onSubmit={(event) => {
          event.preventDefault();
          this.todoTitleIntoArray();
        }}
        >
          <div>
            <input
              type="text"
              placeholder="Title"
              name="todoTitle"
              value={todoTitle}
              onChange={this.handleChange}
            />
            <span
              className={
                isTitle && !todoTitle
                  ? 'not-selected'
                  : 'selected'
            }
            >
              Please enter the title
            </span>
          </div>

          <div>
            <select
              name="selectedUserId"
              value={selectedUserId}
              onChange={this.handleChange}
            >
              <option value="">Choose user</option>
              {users.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            <span
              className={
                isUser && !selectedUserId
                  ? 'not-selected'
                  : 'selected'
            }
            >
              Please choose a user
            </span>
          </div>

          <button type="submit">Add todo</button>
        </form>

        <div>
          <span>ToDo List: </span>

          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}

export default App;
