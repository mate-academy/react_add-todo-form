import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList';
import { Form } from './components/Form';
import users from './api/users';
import todos from './api/todos';

const prepareTodos = todos.map(todo => (
  {
    ...todo, user: users.find(user => todo.userId === user.id),
  }
));

class App extends React.Component {
  state = {
    todos: prepareTodos,
  }

  addTodo = (todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>
        <Form
          users={users}
          addTodo={this.addTodo}
          listOfTodos={this.state.todos}
        />
        <div>
          <TodoList todoList={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
