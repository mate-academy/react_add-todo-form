import React from 'react';
import './App.css';
import todosFromServer from './api/todos';
import { NewTodo } from './components/NewTodo';
import { TodoList } from './components/TodoList';

export class App extends React.Component {
  state = {
    todos: todosFromServer,
  }

  addNewTodo = (newTodo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
    }));
  }

  render() {
    return (
      <div className="App">
        <NewTodo addNewTodo={this.addNewTodo} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}

export default App;
