import React from 'react';
import './App.css';
import { todosFromServer } from './api/todos';
import { users } from './api/users';
import { TodoList } from './components/TodoList/TodoList';
import { NewTodo } from './components/NewTodo/NewTodo';

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(person => person.id === todo.userId),
}));

class App extends React.PureComponent {
  state = {
    todos: [...preparedTodos],
  }

  addNewTodo = (todo) => {
    const newTodo = {
      ...todo,
      id: this.state.todos.length + 1,
      completed: false,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="App">
        <h1>Add todo form</h1>
        <NewTodo
          users={users}
          addNewTodo={this.addNewTodo}
        />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
