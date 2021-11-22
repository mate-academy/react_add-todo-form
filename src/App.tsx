import React from 'react';
import './App.css';
import { Todo } from './types/types';
import { TodoList } from './components/TodoList/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

import users from './api/users';
import todosFromServer from './api/todos';

interface State {
  todos: Todo[];
}

class App extends React.Component<{}, State> {
  state = {
    todos: todosFromServer,
  };

  addTodo = (todoTextInput: string, selectedUserId: number) => {
    this.setState(prevState => {
      const { todos } = prevState;

      const newTodo = {
        userId: selectedUserId,
        id: todos.length + 1,
        title: todoTextInput,
        completed: false,
      };

      return { todos: [...todos, newTodo] };
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <TodoForm
          users={users}
          onAdd={this.addTodo}
        />
        <TodoList
          users={users}
          todos={this.state.todos}
        />
      </div>
    );
  }
}

export default App;
