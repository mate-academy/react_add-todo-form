import React from 'react';
import './App.css';

import users from './api/users';
import todosInitial from './api/todos';
import TodoList from './component/TodoList/TodoList';
import NewTodo from './component/Form/Form';

const initialTodos = todosInitial.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

class App extends React.PureComponent {
  state = {
    todos: initialTodos,
    todoId: todosInitial.length,
    errorMessage: '',
  }

  addTodo = (newTodo) => {
    if (!newTodo.title.trim()) {
      this.setState({
        errorMessage: 'Please enter the title',
      });
    } else if (!newTodo.userId) {
      this.setState({
        errorMessage: 'Please choose a user',
      });
    } else {
      this.setState(state => ({
        todos: [...state.todos, {
          ...newTodo,
          userId: Number(newTodo.userId),
          id: state.todoId + 1,
          user: users.find(user => user.id === +newTodo.userId),
        }],
        todoId: state.todoId + 1,
        errorMessage: '',
      }));
    }
  }

  render() {
    const { todos, errorMessage } = this.state;

    return (
      <div className="App">
        <h1>Todo App</h1>

        <NewTodo users={users} addTodo={this.addTodo} error={errorMessage} />
        <TodoList todos={todos} />
      </div>
    );
  }
}

export default App;
