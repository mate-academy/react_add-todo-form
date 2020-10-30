import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Form } from './components/Form/Form';
import './App.css';

import initialTodos from './api/initialTodos';
import users from './api/users';

const startedTodos = initialTodos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.PureComponent {
  state = {
    todos: startedTodos,
    errorMessage: '',
  }

  addTodo = (newTodo) => {
    if (!newTodo.title.trim()) {
      this.setState({
        errorMessage: 'Enter the title',
      });
    }

    if (!newTodo.userId) {
      this.setState({
        errorMessage: 'Chose somebody',
      });
    }

    if (newTodo.title.trim() && newTodo.userId) {
      this.setState(prevState => ({
        todos: [...prevState.todos, {
          ...newTodo,
          userId: Number(newTodo.userId),
          id: prevState.todos.length + 1,
          completed: false,
          user: users.find(user => user.id === +newTodo.userId),
        }],
        errorMessage: '',
      }));
    }
  };

  render() {
    const { todos, errorMessage } = this.state;

    return (
      <div className="App">
        <Form users={users} addTodo={this.addTodo} error={errorMessage} />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
