import React from 'react';
import users from './api/users';
import staticTodos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';
import './App.css';

class App extends React.Component {
  state = {
    todos: [],
  }

  componentDidMount() {
    const preparedTodos = staticTodos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));

    this.setState({ todos: preparedTodos });
  }

  addTodo = (task, userName) => {
    this.setState((state) => {
      const lastId = state.todos.sort((a, b) => b.id - a.id)[0].id;

      return ({ todos: [...state.todos, {
        id: lastId + 1,
        title: task,
        completed: false,
        user: users.find(user => user.name === userName),
      }] });
    });
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>

        <p>
          <span>Users: </span>
          {users.length}
        </p>

        <Form users={users} onSubmit={this.addTodo} />

        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
