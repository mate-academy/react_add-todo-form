import React from 'react';
import './App.css';
import { TodoList } from './components/TodoList/TodoList';
import { AddTodo } from './components/addTodo/AddTodo';
import users from './api/users';
import todos from './api/todos';

const preparedTodos = todos.map(todo => {
  const user = users.find(person => person.id === todo.userId) || null;

  return { ...todo, user };
});

interface State {
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state: State = {
    todos: [...preparedTodos],
  };

  addNewTodo = (todo: Todo) => {
    this.setState(currentState => ({
      todos: [...currentState.todos, todo],
    }));
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <AddTodo
          addTodo={this.addNewTodo}
          users={users}
          todos={this.state.todos}
        />
        <p>
          <TodoList todos={this.state.todos} />
        </p>
      </div>
    );
  }
}

export default App;
