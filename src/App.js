import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { AddTodoForm } from './components/AddTodoForm';
import todos from './api/todos';
import users from './api/users';

const getUserById = id => users.find(user => user.id === +id);

const preparedTodos = todos.map(todo => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }));

class App extends React.Component {
  state = {
    todos: preparedTodos,
  }

  addTodo = (title, userId) => {
    this.setState(state => ({
      todos: [
        ...state.todos,

        {
          title,
          userId,
          completed: false,
          id: state.todos.length + 1,
          user: getUserById(userId),
        },
      ],
    }));
  }

  render() {
    return (
      <div className="App">
        <div className="greating">
          <h1>Add todo form</h1>
        </div>

        <div className="statistics">
          <p>
            <span>Users: </span>
            {users.length}
          </p>
        </div>

        <section className="form-wrapper">
          <AddTodoForm
            onAddToTheList={this.addTodo}
          />
        </section>

        <section className="list-wrapper">
          <TodoList todos={this.state.todos} />
        </section>

      </div>
    );
  }
}

export default App;
